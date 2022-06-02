import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentimentControllerService {
  public sentimentData = new Subject();
}
