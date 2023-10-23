import { Component } from '@angular/core';
import { CotizacionesService } from 'src/app/service/cotizaciones.service';

@Component({
  selector: 'app-lista-cotizaciones',
  templateUrl: './lista-cotizaciones.component.html',
  styleUrls: ['./lista-cotizaciones.component.scss']
})
export class ListaCotizacionesComponent {

  constructor(public cotizacionesServices: CotizacionesService) {}
}
