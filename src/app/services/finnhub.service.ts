import { Injectable } from '@angular/core';
import {StockData} from '../models/stock-data';
import {HttpClient} from '@angular/common/http';
import {combineLatest, map, Observable} from 'rxjs';
import {isSymbolValid} from '../utils/is-symbol-valid';
import {SentimentData} from '../models/sentiment-data';

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {
  private readonly apiToken = { 'token': 'bu4f8kn48v6uehqi3cqg' };
  private readonly stockUrl = 'https://finnhub.io/api/v1/quote';
  private readonly companyUrl = 'https://finnhub.io/api/v1/stock/profile2';
  private readonly sentimentUrl = 'https://finnhub.io/api/v1/stock/insider-sentiment';

  constructor(private http: HttpClient) { }

  quoteBySymbol(symbol: string): Observable<StockData> {
    if (! isSymbolValid.test(symbol)) {
      throw new Error('Symbol string is incompatible');
    }
    this.getDateStrings();

    return combineLatest([
      this.http.get(this.stockUrl, {params: { ...this.apiToken, symbol }}),
      this.http.get(this.companyUrl, {params: { ...this.apiToken, symbol }}),
    ]).pipe(
      map(([stock, company]) =>
        ({ ...stock, name: (company as StockData).name }) as StockData));
  }

  getInsiderSentiment(symbol: string): Observable<SentimentData> {
    const dates = this.getDateStrings();
    const params = { params: {
      ...this.apiToken,
      ...dates,
      symbol,
    }};

    return combineLatest([
      this.http.get(this.sentimentUrl, params) as Observable<SentimentData>,
      this.http.get(this.companyUrl, {params: { ...this.apiToken, symbol }}),
    ]).pipe(
      map(([sentiment, company]) =>
        ({ ...sentiment, name: (company as SentimentData).name })));

  }

  /**
   * Get all the date strings for querying sentiments without timezone issues
   * @private
   */
  private getDateStrings(): { from: string, to: string } {
    const today = new Date();
    const beforeRecentFirst = new Date(today.getFullYear(), today.getMonth()-3, 1);
    const currentLast = new Date(today.getFullYear(), today.getMonth()+1, 0);

    const formatter = new Intl.DateTimeFormat(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
    const getStringFromFormat = (parts: Intl.DateTimeFormatPart[] ) =>
      parts.find(p => p.type === 'year')?.value + '-' +
        parts.find(p => p.type === 'month')?.value + '-' +
        parts.find(p => p.type === 'day')?.value;

    return {
      from: getStringFromFormat(formatter.formatToParts(beforeRecentFirst)),
      to: getStringFromFormat(formatter.formatToParts(currentLast))
    };
  }
}
