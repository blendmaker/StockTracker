import { Pipe, PipeTransform } from '@angular/core';
import {PercentPipe} from '@angular/common';

@Pipe({
  name: 'signedPercent'
})
export class SignedPercentPipe implements PipeTransform {

  constructor(private percentPipe: PercentPipe) { }

  transform(value: number | string | null | undefined, digitsInfo?: string, locale?: string): string | null {
    let result = this.percentPipe.transform(value, digitsInfo, locale);
    if (value && +value >= 0) {
      result = '+' + result;
    }
    return result;
  }
}
