import { TestBed } from '@angular/core/testing';

import { SentimentControllerService } from './sentiment-controller.service';

describe('SentimentControllerService', () => {
  let service: SentimentControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
