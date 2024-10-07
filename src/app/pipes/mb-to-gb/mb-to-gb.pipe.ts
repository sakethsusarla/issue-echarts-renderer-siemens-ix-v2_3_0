import { Pipe, PipeTransform } from '@angular/core';
import { MEGABYTE_TO_GIGABYTE_DIVISOR } from 'src/app/core';

@Pipe({
  name: 'mbToGb',
})
export class MbToGbPipe implements PipeTransform {
  transform(value: any): string {
    if (value === null || isNaN(value) || value === undefined) {
      return '';
    }

    const gbValue = value instanceof Number 
    ? (value as number) / MEGABYTE_TO_GIGABYTE_DIVISOR
    : parseInt(value) / MEGABYTE_TO_GIGABYTE_DIVISOR;

    return gbValue.toFixed(2);
  }
}
