import { Component, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CotizacionProductoModel } from 'src/app/models/model/cotizacion-producto.model';
import { CotizacionModel } from 'src/app/models/model/cotizacion.model';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { ResponseModel } from 'src/app/models/model/response.model';
import { CotizacionesProductoService } from 'src/app/service/cotizaciones.producto.service';
import { CotizacionesService } from 'src/app/service/cotizaciones.service';
import { JwtService } from 'src/app/service/jwt.service';
import { ProductosService } from 'src/app/service/productos.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-cotizacion-hub',
  templateUrl: './cotizacion-hub.component.html',
  styleUrls: ['./cotizacion-hub.component.scss']
})
export class CotizacionHubComponent {

  cotizacion: CotizacionModel = new CotizacionModel();
  cotizacion_producto: CotizacionProductoModel[] = [];
  productos: ProductoModel[] = [];
  visible: boolean = false;
  isSearchFixed = false;

  productosPares  : ProductoModel[];
  productosImpares: ProductoModel[];

  filteredProductosImpares  : ProductoModel[];
  filteredProductosPares: ProductoModel[];

  constructor(
    public cotizacionesServices: CotizacionesService,
    public cotizacionesProductoServices: CotizacionesProductoService,
    public productoService: ProductosService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private mensaje: ToastService,
    private el: ElementRef
  ) {

    this.getCotizacion();
    
  }

  showDialogAddProducto() {
    this.visible = true;
  }

  getCotizacion() {

    this.route.params.subscribe(params => {
      
      const id = params['id'];
      const token: string | null = this.jwtService.getToken();

      if(token == null || this.jwtService.isTokenExpired(token)) {
        
        this.router.navigate(['auth/login']);
        return;
      }
      
      const decode:any = this.jwtService.decodeToken(token);

      const roles       :string[] = decode.roles;
      const id_usuario  :string   = decode.sub;

      this.cotizacionesServices.getCotizacion(token,id).subscribe(
                
        (res) => {

          if (res.status == 200) {
              
            const body      : ResponseModel = res.body;
            const code      : string = body.code;
            const response  : CotizacionModel = body.response;
  
            if(code === '#GCS') {
  
              this.cotizacion = response;
              this.getCotizacion_Producto();
            }
  
            return;
  
          } else if (res.status == 500) {
  
            const body  : ResponseModel = res.body;
            const code  : string = body.code;
            
            if(code === '#feq') {
              
              this.mensaje.mostrarAlertaError('Error','Reporta el error por favor.');
              return;
            }
            
            if(code === '#NCE') {
              
              this.mensaje.mostrarAlertaError('Nombre','Nombre no disponible.');
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
    });
  }

  getCotizacion_Producto() {

    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      
      this.router.navigate(['auth/login']);
      return;
    }

    this.cotizacionesProductoServices.getCotizacionesProductoList(token,this.cotizacion.id == undefined? '':this.cotizacion.id).subscribe(
                
      (res) => {

        if (res.status == 200) {
            
          const body      : ResponseModel = res.body;
          const code      : string = body.code;
          const response  : CotizacionProductoModel[] = body.response;

          if(code === '#GCPS') {

            this.cotizacion_producto = response;

            if(this.cotizacion_producto.length < 1) return;

            this.getProductos();
          }

          return;

        } else if (res.status == 500) {

          const body  : ResponseModel = res.body;
          const code  : string = body.code;
          
          if(code === '#feq') {
            
            this.mensaje.mostrarAlertaError('Error','Reporta el error por favor.');
            return;
          }
          
          if(code === '#NCE') {
            
            this.mensaje.mostrarAlertaError('Nombre','Nombre no disponible.');
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

    this.filteredProductosPares = this.productosPares.filter((producto) =>
      producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
    );

    this.filteredProductosImpares = this.productosImpares.filter((producto) =>
      producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
    );
  }

  async getProductos() {

    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      
      this.router.navigate(['auth/login']);
      return;
    }

    await this.consultar();
    
  }

  consultar() {

    for (const cotizacionProducto of this.cotizacion_producto) {
      
      const idProducto = cotizacionProducto.id_producto;
      
      this.productoService.getProducto(idProducto).subscribe(
          
        (resp) => {

          if(resp.status == 200){

            let response: ResponseModel = resp.body;

            if(response.code === '#SP') {

              const producto:ProductoModel = response.response;
              this.productos.push(producto);
              this.filteredProductosPares   = this.productos.filter((_, index) => index % 2 === 0);
              this.filteredProductosImpares = this.productos.filter((_, index) => index % 2 !== 0);
              
              this.productosPares   = this.productos.filter((_, index) => index % 2 === 0);
              this.productosImpares = this.productos.filter((_, index) => index % 2 !== 0);
            }
          }
        },

        (error) => {

          this.mensaje.mostrarAlertaError('Error', "Algo salio mal, reportalo por favor.");
          this.router.navigate(['app']);
        }
      );
    }

  }





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
}
