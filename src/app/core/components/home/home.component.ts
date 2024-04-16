import { Component, ElementRef, HostListener } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { HomeService } from './home.service';
import { ResponseModel } from 'src/app/models/model/response.model';
import { ToastService } from 'src/app/service/toast.service';
import { AllProductosModel } from 'src/app/models/model/all-productos.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  estadoBanner: boolean = true;
  isLoading:    boolean = false;

  // productos       : ProductoModel[] = [];
  
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

    this.isLoading = true;
    
    this.homeService.getProductos().subscribe(
      
      (res) => {
        
        if (res.status == 200) {
          
          const body: ResponseModel = res.body;
          const response : AllProductosModel = body.response;

          this.filteredProductosPares   = response.productos_pares;
          this.filteredProductosImpares = response.productos_impares;

          this.productosPares   = response.productos_pares;
          this.productosImpares = response.productos_impares;
        
          this.isLoading = false;
          return;
          
        } else if (res.status == 500) {

          const body: ResponseModel = res.body;
          const code : string = body.code;
          
          if(code === '#feq') {
            
            this.isLoading = false;
            this.mensaje.mostrarAlertaError('Error','Reporta el error por favor.');
            return;
          }
        }
        
        this.mensaje.mostrarAlertaError('Error','Algo salio mal.');
        this.isLoading = false;
        return;
      },
      (err)=>{
        
        this.isLoading = false;
        this.mensaje.mostrarAlertaError('Error','');
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
