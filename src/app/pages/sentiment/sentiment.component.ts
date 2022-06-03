import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FinnhubService} from '../../services/finnhub.service';
import {SentimentData} from '../../models/sentiment-data';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentimentComponent implements OnInit {
  sentimentData!: SentimentData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public finnhub: FinnhubService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.finnhub.getInsiderSentiment(params['symbol']).subscribe(sentimentData => {
        this.sentimentData = sentimentData;
        this.cdRef.detectChanges();
      });
    });
  }

}
