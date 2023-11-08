import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent {

  @Input() productos: ProductoModel[];
  @Output() productoChanged = new EventEmitter<ProductoModel>();

  onInputCardChange(producto: ProductoModel) {

    this.productoChanged.emit(producto);
  }
}
