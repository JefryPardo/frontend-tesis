import { Component, Input } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent {

  @Input() producto: ProductoModel;

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

  evaluarUnidades(unidades:string) {

    const disponible_number = parseInt(unidades, 10);

    if(disponible_number == null || disponible_number == undefined) return '0';

    if(disponible_number>1000) return '1000+';
    
    return disponible_number.toString();
  }

  validarPrecio( producto :ProductoModel ) {

    return producto.precio < producto.precio_anterior;
  }
}
