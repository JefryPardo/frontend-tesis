import { Component, Input } from '@angular/core';
import { CotizacionModel } from 'src/app/models/model/cotizacion.model';

@Component({
  selector: 'app-orderlist-cotizaciones',
  templateUrl: './orderlist-cotizaciones.component.html',
  styleUrls: ['./orderlist-cotizaciones.component.scss']
})
export class OrderlistCotizacionesComponent {

  cotizacion: CotizacionModel;
  @Input() cotizaciones : CotizacionModel[];
  @Input() titulo       : string;

  verCotizacion() {

    console.log('verCotizacion');
  }

  menu() {

    console.log('menu');
  }
}
