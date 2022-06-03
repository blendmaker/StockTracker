import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FinnhubService} from '../../services/finnhub.service';
import {StockData} from '../../models/stock-data';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit{
  @Input() symbol!: string;
  @Output() removeClicked = new EventEmitter();
  stockData!: StockData;

  constructor(public finnhub: FinnhubService) { }

  ngOnInit(): void {
    this.finnhub.quoteBySymbol(this.symbol).subscribe(stockData => this.stockData = stockData);
  }
}
