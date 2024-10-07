import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullCheck',
})
export class NullCheckPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value == undefined || value == null || value === '(null)' || value === 'null') {
      return 'Unknown';
    }

    return value;
  }
}
