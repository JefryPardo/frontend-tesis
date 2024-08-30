import { Component, ElementRef, HostListener } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { ToastService } from 'src/app/service/toast.service';
import { InicioService } from '../../inicio.service';
import { ResponseModel } from 'src/app/models/model/response.model';
import { JwtService } from 'src/app/service/jwt.service';
import { Router } from '@angular/router';
import { ResponseExcepcionModel } from 'src/app/models/model/response.excepcion.mode';
import { AllProductosModel } from 'src/app/models/model/all-productos.model';

@Component({
  selector: 'app-inicio-hub',
  templateUrl: './inicio-hub.component.html',
  styleUrls: ['./inicio-hub.component.scss']
})
export class InicioHubComponent {

  estadoBanner: boolean = true;

  // productos: ProductoModel[] = [];
  
  filteredProductosImpares  : ProductoModel[];
  filteredProductosPares: ProductoModel[];
  
  productosPares  : ProductoModel[];
  productosImpares: ProductoModel[];

  isSearchFixed = false;

  constructor(
    private mensaje: ToastService,
    private el: ElementRef, 
    private inicioService: InicioService,
    private router: Router,
    private jwtService: JwtService
  ) {
    
    this.getListProducto();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const searchElement = this.el.nativeElement.querySelector('#search');
    const spacerElement = this.el.nativeElement.querySelector('.spacer');
    const bannerHeight = this.el.nativeElement.querySelector('app-banner').offsetHeight;
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

  getListProducto():void {
    
    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      this.router.navigate(['auth/login']);
      return;
    }
    
    this.inicioService.getProductos(token).subscribe(
      
      (res) => {

        if (res.status == 200) {
          
          const body: ResponseModel = res.body;
          const response : ProductoModel[] = body.response;

          this.filteredProductosPares = [];
          this.filteredProductosImpares = [];
          this.productosPares = [];
          this.productosImpares = [];

          response.forEach((producto, index) => {
            if (index % 2 === 0) {
              this.filteredProductosPares.push(producto);
              this.productosPares.push(producto);
            } else {
              // Índices impares
              this.filteredProductosImpares.push(producto);
              this.productosImpares.push(producto);
            }
          });

          return;

        } else if (res.status == 500) {

          const code: string = res.body.code;
          
          if(code === "TOK02") {

            this.router.navigate(['auth/login']);
            return;
          }

          if(code === '#feq') {

            this.mensaje.mostrarAlertaError('Error','Reporta el error por favor.');
            return;
          }
        }
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

  onCardChanged(id_producto: string) {

    this.router.navigate(['app/catalogo/producto', id_producto]);
  }
}
