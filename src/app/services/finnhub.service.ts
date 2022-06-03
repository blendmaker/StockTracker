import { Injectable } from '@angular/core';
import {StockData} from '../models/stock-data';
import {HttpClient} from '@angular/common/http';
import {combineLatest, map, Observable, of, tap} from 'rxjs';
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

  // hosted from github.io the requests tend to be very slow, up to a couple of seconds. So we cache the data for the
  // time, the app runs
  public cachedStocks: { [key: string]: StockData } = {};
  public cachedSentiments: { [key: string]: SentimentData } = {};

  constructor(private http: HttpClient) { }

  quoteBySymbol(symbol: string): Observable<StockData> {
    if (! isSymbolValid.test(symbol)) {
      throw new Error('Symbol string is incompatible');
    }

    // since requests might be slow, we only trigger the request once and afterwards deliver cache
    // obviously the most clean way would be to remove data from cache as well, when the symbol gets removed from localStorage
    // in this case however memory won't become an issue
    if (Object.keys(this.cachedStocks).find(key => key === symbol)) {
      return of(this.cachedStocks[symbol]);
    }

    return combineLatest([
      this.http.get(this.stockUrl, {params: { ...this.apiToken, symbol }}),
      this.http.get(this.companyUrl, {params: { ...this.apiToken, symbol }}),
    ]).pipe(
      map(([stock, company]) => ({ ...stock, name: (company as StockData).name }) as StockData),
      tap(stockData => this.cachedStocks[symbol] = stockData)
    );
  }

  getInsiderSentiment(symbol: string): Observable<SentimentData> {
    const dates = this.getDateStrings();
    const params = { params: {
      ...this.apiToken,
      ...dates,
      symbol,
    }};

    // pretty much, same as above, see line 32
    if (Object.keys(this.cachedSentiments).find(key => key === symbol)) {
      return of(this.cachedSentiments[symbol]);
    }

    return (this.http.get(this.sentimentUrl, params) as Observable<SentimentData>).pipe(
      tap(sentimentData => this.cachedSentiments[symbol] = sentimentData));

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
