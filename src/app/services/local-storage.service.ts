import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {isSymbolValid} from '../utils/is-symbol-valid';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly localStorageKey = 'symbols'
  private _storedSymbols$ = new BehaviorSubject<string[]>([]);
  get storedSymbols$(): BehaviorSubject<string[]> {
    if (this._storedSymbols$.value.length === 0) {
      this._storedSymbols$.next(this.getStoredSymbols());
    }
    return this._storedSymbols$;
  }

  constructor() {}

  /**
   * Retrieve full list of symbols from localstorage
   * @private
   */
  private getStoredSymbols(): string[] {
    try {
      const symbols = JSON.parse(localStorage.getItem(this.localStorageKey) || '');
      if (Array.isArray(symbols)) {
        return symbols.filter(symbol => isSymbolValid.test(symbol));
      }
    } catch (e) {
      console.warn('Couldn\'t load stored symbols. Resetting');
      if (!environment.production) {
        console.warn(e);
      }
    }
    localStorage.setItem(this.localStorageKey, '[]');
    return [];
  }

  /**
   * Store a new symbol to the list in localstorage
   * @param symbol
   */
  storeSymbol(symbol: string): void {
    const newSymbols = [ ...this.getStoredSymbols(), symbol ];
    localStorage.setItem(this.localStorageKey, JSON.stringify(newSymbols));
    this.storedSymbols$.next(newSymbols);
  }

  /**
   * Remove a single symbol from localstorage if it exists
   * @param symbol
   */
  removeSymbol(symbol: string): void {
    const newSymbols = this.getStoredSymbols().filter(storedSymbols => storedSymbols !== symbol);
    localStorage.setItem(this.localStorageKey, JSON.stringify(newSymbols));
    this.storedSymbols$.next(newSymbols);
  }
}
