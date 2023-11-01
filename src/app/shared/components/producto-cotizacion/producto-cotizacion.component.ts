import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-producto-cotizacion',
  templateUrl: './producto-cotizacion.component.html',
  styleUrls: ['./producto-cotizacion.component.scss']
})
export class ProductoCotizacionComponent {

  @Input() producto: ProductoModel;
  @Input() favorito: boolean;
  @Output() dateChanged = new EventEmitter<string>();

  constructor() {
    if(this.producto == undefined) this.producto = new ProductoModel();
  }

  toggleFavorite(favorito: boolean) {

    this.favorito = !favorito;
    this.dateChanged.emit(`favorito;${this.favorito}`);
  }
  
  toggleInsert(producto: ProductoModel) {

    this.dateChanged.emit(`insert;${producto.id}`);
  }

}
