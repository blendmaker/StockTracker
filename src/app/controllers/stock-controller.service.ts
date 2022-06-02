import { Injectable } from '@angular/core';
import { FinnhubService } from '../services/finnhub.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StockControllerService {
  constructor(private finnhubService: FinnhubService, private localStorage: LocalStorageService) {}


}

/**
 * https://finnhub.io/docs/api/quote
 * https://finnhub.io/docs/api/symbol-search
 * bu4f8kn48v6uehqi3cqg
 */
