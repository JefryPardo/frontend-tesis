import { Component, Input } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() productosPares: ProductoModel[];
  @Input() productosImpares: ProductoModel[];

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

  evaluarUnidades(unidades:number) {

    if(unidades == null || unidades == undefined) return '0';

    if(unidades>1000) return '1000+';
    
    return unidades.toString();
  }

  validarPrecio( producto :ProductoModel ) {

    return producto.precio < producto.precio_anterior;
  }
}
