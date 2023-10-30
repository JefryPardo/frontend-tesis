import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-carta-grid',
  templateUrl: './carta-grid.component.html',
  styleUrls: ['./carta-grid.component.scss']
})
export class CartaGridComponent {

  @Output() idChanged = new EventEmitter<string>();

  @Input() banner: boolean = false;
  @Input() productosPares: ProductoModel[];
  @Input() productosImpares: ProductoModel[];

  onInputCardChange(producto: ProductoModel) {
    console.log(producto);
    this.idChanged.emit(producto.id);
  }
}
