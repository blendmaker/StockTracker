import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FinnhubService} from '../../services/finnhub.service';
import {SentimentData} from '../../models/sentiment-data';
import {first, Subject, switchMap, takeUntil} from 'rxjs';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentimentComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  sentimentData!: SentimentData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public finnhub: FinnhubService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroyed$),
      switchMap(params => this.finnhub.getInsiderSentiment(params['symbol']))
    ).subscribe(sentimentData => {
      this.sentimentData = sentimentData;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
