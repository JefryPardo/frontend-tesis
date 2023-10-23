import { Component } from '@angular/core';

@Component({
  selector: 'app-create-cotizacion',
  templateUrl: './create-cotizacion.component.html',
  styleUrls: ['./create-cotizacion.component.scss']
})
export class CreateCotizacionComponent {

  visible: boolean = false;

  showDialog(){

    this.visible = !this.visible;
  }

  crearCotizacion() {

    console.log('crear');
  }
}
