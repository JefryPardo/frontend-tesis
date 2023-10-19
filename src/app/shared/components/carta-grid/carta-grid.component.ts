import { Component, Input } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-carta-grid',
  templateUrl: './carta-grid.component.html',
  styleUrls: ['./carta-grid.component.scss']
})
export class CartaGridComponent {

  @Input() banner: boolean = false;
  @Input() productosPares: ProductoModel[];
  @Input() productosImpares: ProductoModel[];

  
}
