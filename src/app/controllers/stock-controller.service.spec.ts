import { TestBed } from '@angular/core/testing';

import { StockControllerService } from './stock-controller.service';

describe('StockControllerService', () => {
  let service: StockControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
