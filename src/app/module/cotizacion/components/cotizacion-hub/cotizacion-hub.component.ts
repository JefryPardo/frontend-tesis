import { Component, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CotizacionProductoModel } from 'src/app/models/model/cotizacion-producto.model';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { ResponseModel } from 'src/app/models/model/response.model';
import { ResumenProductoModel } from 'src/app/models/model/resumen-producto.model';
import { ResumenModel } from 'src/app/models/model/resumen.model';
import { CotizacionesProductoService } from 'src/app/service/cotizaciones.producto.service';
import { CotizacionesService } from 'src/app/service/cotizaciones.service';
import { JwtService } from 'src/app/service/jwt.service';
import { ProductosService } from 'src/app/service/productos.service';
import { ResumenService } from 'src/app/service/resumen.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-cotizacion-hub',
  templateUrl: './cotizacion-hub.component.html',
  styleUrls: ['./cotizacion-hub.component.scss']
})
export class CotizacionHubComponent {

  resumen: ResumenModel = new ResumenModel();
  resumen_producto_select: ProductoModel;

  visible_listado_productos_catalogo: boolean = false;

  listado_productos_catalogo: ProductoModel[] = [];

  visible_producto: boolean = false;
  pdf_show: boolean = false;
  show_listado_productos_cotizados: boolean = false;
  select: boolean = false;
  isSearchFixed = false;


  productosPares  : ResumenProductoModel[];
  productosImpares: ResumenProductoModel[];
  filteredProductosImpares  : ResumenProductoModel[] = [];
  filteredProductosPares    : ResumenProductoModel[] = [];


  constructor(
    public resumenServices: ResumenService,
    public cotizacionesServices: CotizacionesService,
    public cotizacionesProductoServices: CotizacionesProductoService,
    public productoService: ProductosService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private mensaje: ToastService,
    private el: ElementRef
  ) {

    this.pdf_show = false;
    this.getResumen();
  }

  getResumen() {

    this.route.params.subscribe(params => {
      
      const id = params['id'];
      const token: string | null = this.jwtService.getToken();

      if(token == null || this.jwtService.isTokenExpired(token)) {
        
        this.router.navigate(['auth/login']);
        return;
      }

      this.resumenServices.getResumen(token,id).subscribe(
                
        (res) => {
          if (res.status == 200) {
              
            const body      : ResponseModel = res.body;
            const code      : string = body.code;
            
            if(code === '#SR') {
              
              const response  : ResumenModel = body.response;
              this.resumen = response;
              this.filteredProductosPares   = this.resumen.resumen_producto.filter((_, index) => index % 2 === 0);
              this.filteredProductosImpares = this.resumen.resumen_producto.filter((_, index) => index % 2 !== 0);
              this.productosPares   = this.resumen.resumen_producto.filter((_, index) => index % 2 === 0);
              this.productosImpares = this.resumen.resumen_producto.filter((_, index) => index % 2 !== 0);
              this.show_listado_productos_cotizados = true;
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
            
          this.mensaje.mostrarAlertaError('error',err);
          return;
        }
      );
    });
  }



  consultarProductosCatalogo() {

    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      
      this.router.navigate(['auth/login']);
      return;
    }

    this.productoService.getProductos(token).subscribe(
          
      (resp) => {

        if(resp.status == 200){


          let response: ResponseModel = resp.body;

          if(response.code === '#SP') {

            this.listado_productos_catalogo = response.response;
            this.select = false;
          }
        }
      },

      (error) => {

        this.mensaje.mostrarAlertaError('Error', "Algo salio mal, reportalo por favor.");
        this.router.navigate(['app']);
      }
    );

    this.visible_listado_productos_catalogo = true;
  }

  filtro(filtro: string) {

    // this.filteredProductosPares = this.productosPares.filter((data) =>
    //     data.producto.nombre.toLowerCase().includes(filtro.toLowerCase())
    // );

    // this.filteredProductosImpares = this.productosImpares.filter((data) =>
    //   data.producto.nombre.toLowerCase().includes(filtro.toLowerCase())
    // );
  }

  onCardCotizado(resumen_producto: ResumenProductoModel) {
    
    this.resumen_producto_select = resumen_producto.producto;
    this.visible_producto = true;
  }

  onProductoChanged(producto: ProductoModel) {

    this.resumen_producto_select = new ProductoModel();

    if(producto) {

      this.resumen_producto_select = producto;
      this.select = true;
    }

  }
  
  onCrud(action: string) {

    const actions:string[] = action.split(";");
    if(actions[0] && actions[0] == 'insert') {
      
      const token: string | null = this.jwtService.getToken();

      if(token == null || this.jwtService.isTokenExpired(token)) {
        
        this.router.navigate(['auth/login']);
        return;
      }

      const id_producto:string    = actions[1];
      const cantidad:string       = actions[2];
      const id_cotizacion:string  = this.resumen.cotizacion.id == undefined? '':this.resumen.cotizacion.id;

      const producto: ResumenProductoModel | undefined = this.resumen.resumen_producto.find((data: ResumenProductoModel) => {
        return data.producto.id === id_producto;
      });
  
      if(producto) {
  
        this.mensaje.mostrarAlertaError('Producto','El producto ya se encuentra en la cotización.');
        return;
      }

      const cotizacion_producto:CotizacionProductoModel = {

        "cantidad": cantidad,
        "id_producto": id_producto,
        "id_cotizacion": id_cotizacion
      }

      this.cotizacionesProductoServices.createCotizacionProducto(token,cotizacion_producto).subscribe(
                
        (res) => {
  
          if (res.status == 200) {
              
            const body      : ResponseModel = res.body;
            const code      : string = body.code;
  
            if(code === '#ICPS') {
  
              this.getResumen();
              this.mensaje.mostrarAlertaSuccess('Producto','El producto se agrego correctamente.');
              this.visible_listado_productos_catalogo = false;
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

    if(actions[0] && actions[0] == 'delete') {

      const token: string | null = this.jwtService.getToken();

      if(token == null || this.jwtService.isTokenExpired(token)) {
        
        this.router.navigate(['auth/login']);
        return;
      }

      const id_producto:string = actions[1];
      const id_cotizacion:string  = this.resumen.cotizacion.id == undefined? '':this.resumen.cotizacion.id;

      this.cotizacionesProductoServices.deleteCotizacionesProductoById(token,id_cotizacion,id_producto).subscribe(
                
        (res) => {

          if (res.status == 200) {
              
            const body      : ResponseModel = res.body;
            const code      : string = body.code;
  
            if(code === '#DCPS') {
  
              this.getResumen();
              this.mensaje.mostrarAlertaSuccess('Producto','El producto se elimino correctamente.');
              this.visible_producto = false;
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

  }

  generarPdf() {

    this.pdf_show = true;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const searchElement = this.el.nativeElement.querySelector('#search');
    const spacerElement = this.el.nativeElement.querySelector('.spacer');
    const bannerHeight = this.el.nativeElement.querySelector('section').offsetHeight;
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

  getnombreCotizacion() {
    
    if(this.resumen.cotizacion == undefined) return '';

    return this.resumen.cotizacion.nombre;
  }
}
