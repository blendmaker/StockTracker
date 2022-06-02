import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentimentControllerService } from 'src/app/controllers/sentiment-controller.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    public sentimentController: SentimentControllerService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(console.warn);
    // console.warn(this.activatedRoute);
  }

}
