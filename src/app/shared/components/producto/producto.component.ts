import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Imagen } from 'src/app/models/interface/imagen.interface';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  @Input() producto: ProductoModel;

  @Input() productos: ProductoModel[];
  @Input() productosPares: ProductoModel[];
  @Input() productosImpares: ProductoModel[];
  
  @Input() favorito: boolean;

  constructor() {

    console.log(this.producto);
  }
  
  toggleFavorite(favorito: boolean) {

    this.favorito = !favorito;
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

  evaluarUnidades(unidades:number) {

    if(unidades == null || unidades == undefined) return '0';

    if(unidades>1000) return '1000+';
    
    return unidades.toString();
  }
  
  validarPrecio( producto :ProductoModel ) {

    return producto.precio < producto.precio_anterior;
  }
}


