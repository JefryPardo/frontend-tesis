import { Component, Input } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-input-precio-oferta',
  templateUrl: './input-precio-oferta.component.html',
  styleUrls: ['./input-precio-oferta.component.scss']
})
export class InputPrecioOfertaComponent {

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

  calcularDiferenciaPorcentaje(producto :ProductoModel): string  | void {
      
    const diferencia = producto.precio_anterior - producto.precio;
    const porcentaje = (diferencia / producto.precio_anterior) * 100;
    
    return `- ${porcentaje.toFixed(2)}% Descuento.`;
  }
}
