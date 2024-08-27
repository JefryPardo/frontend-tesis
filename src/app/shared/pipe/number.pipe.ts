import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value === 'number') {
      return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else if (typeof value === 'string') {
      // Si el valor es una cadena, intenta convertirla a número y luego aplicar el formato
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        return numericValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
    // Si el valor no es numérico o no se puede convertir, devuelve el valor original como cadena
    return value.toString();
  }
}