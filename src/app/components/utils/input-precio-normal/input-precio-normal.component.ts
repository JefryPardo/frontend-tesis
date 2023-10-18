import { Component, Input } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-input-precio-normal',
  templateUrl: './input-precio-normal.component.html',
  styleUrls: ['./input-precio-normal.component.scss']
})
export class InputPrecioNormalComponent {

  @Input() producto: ProductoModel;

  validarPrecio( producto :ProductoModel ) {

    return producto.precio < producto.precio_anterior;
  }

  valorEntero(precio:number):number {
    
    const parteEntera: number = Math.floor(precio);

    return parteEntera;
  }

  valorDecimal(precio: number) {
    return this.obtenerParteDecimal(precio);
  }

  obtenerParteDecimal(numero: number): number {
    
    const parteEntera = Math.floor(numero);
    const parteDecimal = (numero - parteEntera) * 100;
    return Math.round(parteDecimal);
  }
}
