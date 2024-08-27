import { Component, Input } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-producto-cotizado',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoCotizadoComponent {

  @Input() producto: ProductoModel;
  @Input() unidades: string;

  constructor() {}

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