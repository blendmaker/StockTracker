import { Injectable } from '@angular/core';
import * as finnhub from 'finnhub';

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {
  private finnhubClient;
  constructor() { }
}
