import { Component } from '@angular/core';
import { CotizacionesService } from 'src/app/service/cotizaciones.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent {

  constructor(public cotizacionesServices: CotizacionesService) {}
}
