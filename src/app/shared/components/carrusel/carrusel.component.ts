import { Component, Input } from '@angular/core';
import { Imagen } from 'src/app/models/interface/imagen.interface';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss']
})
export class CarruselComponent {

  @Input() imagenes: Imagen[];

}
