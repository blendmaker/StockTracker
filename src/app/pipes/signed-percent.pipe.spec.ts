import { SignedPercentPipe } from './signed-percent.pipe';
import {TestBed} from '@angular/core/testing';
import {PercentPipe} from '@angular/common';

describe('SignedPercentPipe', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        PercentPipe
      ]
    })
      .compileComponents();
  });

  it('create an instance', () => {
    const percentPipe = TestBed.inject(PercentPipe);
    const pipe = new SignedPercentPipe(percentPipe);
    expect(pipe).toBeTruthy();
  });
});
