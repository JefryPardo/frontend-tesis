import { Component, Input } from '@angular/core';
import { CotizacionModel } from 'src/app/models/model/cotizacion.model';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent {

  @Input() cotizacion: CotizacionModel;
  @Input() cotizaciones: CotizacionModel[];
}
