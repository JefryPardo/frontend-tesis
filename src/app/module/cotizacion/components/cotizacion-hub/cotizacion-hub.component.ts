import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { CotizacionesService } from 'src/app/service/cotizaciones.service';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-cotizacion-hub',
  templateUrl: './cotizacion-hub.component.html',
  styleUrls: ['./cotizacion-hub.component.scss']
})
export class CotizacionHubComponent {

  visible: boolean = false;
  isSearchFixed = false;

  constructor(
    public cotizacionService: CotizacionesService,
    public productosService  : ProductosService,
    private el: ElementRef
  ) {}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const searchElement = this.el.nativeElement.querySelector('#search');
    const spacerElement = this.el.nativeElement.querySelector('.spacer');
    const bannerHeight = this.el.nativeElement.querySelector('section').offsetHeight;
    const scrollPosition = window.pageYOffset;
    const spacerHeight = spacerElement.clientHeight;

    if (scrollPosition >= bannerHeight) {
      searchElement.classList.add('fixed-search');
      spacerElement.style.height = searchElement.clientHeight + 'px';
      this.isSearchFixed = true;
    } else {
      searchElement.classList.remove('fixed-search');
      spacerElement.style.height = '0';
      this.isSearchFixed = false;
    }
  }

  showDialogAddProducto() {
      this.visible = true;
  }
}
