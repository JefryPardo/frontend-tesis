import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResumenProductoModel } from 'src/app/models/model/resumen-producto.model';

@Component({
  selector: 'app-grid-producto',
  templateUrl: './grid-producto.component.html',
  styleUrls: ['./grid-producto.component.scss']
})
export class GridProductoComponent {

  @Output() productoEmit = new EventEmitter<ResumenProductoModel>();
  
  @Input()  productosPares   : ResumenProductoModel[];
  @Input()  productosImpares : ResumenProductoModel[];

  constructor() {

    console.log(this.productosPares);
    console.log(this.productosImpares);
  }

  onInputCardChange(producto: ResumenProductoModel) {

    this.productoEmit.emit(producto);
  }
}
