import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return value.toString();
    }
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}