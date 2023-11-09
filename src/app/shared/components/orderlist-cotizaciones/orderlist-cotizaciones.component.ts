import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  verCotizacion(cotizacion:CotizacionModel) {

    this.router.navigate(['app/cotizacion/hub', cotizacion.id]);
  }

  menu() {
  }
}
