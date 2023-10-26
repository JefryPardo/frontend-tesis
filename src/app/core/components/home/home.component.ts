import { Component, ElementRef, HostListener } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { HomeService } from './home.service';
import { ResponseModel } from 'src/app/models/model/response.model';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  estadoBanner: boolean = true;

  productos       : ProductoModel[] = [];
  
  filteredProductosImpares  : ProductoModel[];
  filteredProductosPares: ProductoModel[];
  
  productosPares  : ProductoModel[];
  productosImpares: ProductoModel[];

  isSearchFixed = false;

  constructor(private mensaje: ToastService, private el: ElementRef, private homeService: HomeService) {
    
    this.getListProducto();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const searchElement = this.el.nativeElement.querySelector('#search');
    const spacerElement = this.el.nativeElement.querySelector('.spacer');
    const bannerHeight = this.el.nativeElement.querySelector('app-banner').offsetHeight;
    const scrollPosition = window.pageYOffset;

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

  getListProducto():void {
    
    this.homeService.getProductos().subscribe(
      
      (res) => {
        
        if (res.status == 200) {
          
          const body: ResponseModel = res.body;
          const response : ProductoModel[] = body.response;

          this.productos = response;
          this.filteredProductosPares   = this.productos.filter((_, index) => index % 2 === 0);
          this.filteredProductosImpares = this.productos.filter((_, index) => index % 2 !== 0);
          
          this.productosPares   = this.productos.filter((_, index) => index % 2 === 0);
          this.productosImpares = this.productos.filter((_, index) => index % 2 !== 0);

          return;

        } else if (res.status == 500) {

          const body: ResponseModel = res.body;
          const code : string = body.code;

          if(code === '#feq') {

            this.mensaje.mostrarAlertaError('Error','Reporta el error por favor.');
            return;
          }
        }

        this.mensaje.mostrarAlertaError('Error','Algo salio mal.');
        return;
      },
      (err)=>{
        
        this.mensaje.mostrarAlertaError('Spinner off','');
        return;
      }
    );
  }

  onSearchChanged(nombreProducto: string) {

    this.estadoBanner = (nombreProducto.length == 0);
    this.filteredProductosPares = this.productosPares.filter((producto) =>
      producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
    );

    this.filteredProductosImpares = this.productosImpares.filter((producto) =>
      producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
    );
  }
}
