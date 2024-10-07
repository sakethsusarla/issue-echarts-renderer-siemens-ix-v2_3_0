import { Pipe, PipeTransform } from '@angular/core';
import { HZ_TO_GHZ_DIVISOR } from 'src/app/core';

@Pipe({
  name: 'hzToGHz'
})
export class HzToGHzPipe implements PipeTransform {

  transform(value: any): string {
    if (value === null || isNaN(value) || value === undefined) {
      return '';
    }
    
    // Convert Hz to GHz
    const gigaHertz = value instanceof Number 
    ? (value as number) / HZ_TO_GHZ_DIVISOR
    : parseInt(value) / HZ_TO_GHZ_DIVISOR;

    // Format the result to two decimal places
    return gigaHertz.toFixed(2);
  }

}
