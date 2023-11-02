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
  productos_cotizados: ProductoModel[] = [];
  todos_productos: ProductoModel[] = [];
  producto_select:ProductoModel;
  visible: boolean = false;
  visible_producto: boolean = false;
  select: boolean = false;
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

            this.todos_productos = response.response;
            this.select = false;
          }
        }
      },

      (error) => {

        this.mensaje.mostrarAlertaError('Error', "Algo salio mal, reportalo por favor.");
        this.router.navigate(['app']);
      }
    );

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

    this.cotizacion_producto = [];

    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      
      this.router.navigate(['auth/login']);
      return;
    }

    this.cotizacionesProductoServices.getCotizacionesProductoList(token,this.cotizacion.id == undefined? '':this.cotizacion.id).subscribe(
                
      (res) => {

        console.log(res);

        if (res.status == 200) {
            
          const body      : ResponseModel = res.body;
          const code      : string = body.code;
          const response  : CotizacionProductoModel[] = body.response;

          if(code === '#GCPS') {

            this.cotizacion_producto = response;

            if(this.cotizacion_producto.length < 1) {

              this.productos_cotizados = [];
              this.filteredProductosPares =[];
              this.filteredProductosImpares =[];
              this.productosPares =[];
              this.productosImpares =[];
              return;
            }

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

    await this.consultar(token);
    
  }

  consultar(token:string) {

    this.productos_cotizados = [];

    for (const cotizacionProducto of this.cotizacion_producto) {
      
      const idProducto = cotizacionProducto.id_producto;
      
      this.productoService.getProducto(idProducto,token).subscribe(
          
        (resp) => {

          if(resp.status == 200){

            let response: ResponseModel = resp.body;

            if(response.code === '#SP') {

              console.log(this.productos_cotizados);
              const producto:ProductoModel = response.response;
              this.productos_cotizados.push(producto);
              this.filteredProductosPares   = this.productos_cotizados.filter((_, index) => index % 2 === 0);
              this.filteredProductosImpares = this.productos_cotizados.filter((_, index) => index % 2 !== 0);
              
              this.productosPares   = this.productos_cotizados.filter((_, index) => index % 2 === 0);
              this.productosImpares = this.productos_cotizados.filter((_, index) => index % 2 !== 0);
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

  onCardCotizado(id_producto: string) {
    
    const producto: ProductoModel | undefined = this.productos_cotizados.find((p: ProductoModel) => {
      return p.id === id_producto;
    });

    if(producto == undefined) return;
    this.producto_select = producto;
    this.visible_producto = true;
  }

  onCardChanged(id_producto: string) {

    this.producto_select = new ProductoModel();

    const producto: ProductoModel | undefined = this.todos_productos.find((p: ProductoModel) => {
      return p.id === id_producto;
    });

    if(producto) {

      this.producto_select = producto;
      this.select = true;
    }

  }
  
  onCrud(action: string) {

    console.log(action);

    const actions:string[] = action.split(";");
    if(actions[0] && actions[0] == 'insert') {
      
      const token: string | null = this.jwtService.getToken();

      if(token == null || this.jwtService.isTokenExpired(token)) {
        
        this.router.navigate(['auth/login']);
        return;
      }

      const id_producto:string    = actions[1];
      const cantidad:string       = actions[2];
      const id_cotizacion:string  = this.cotizacion.id == undefined? '':this.cotizacion.id;

      const producto: ProductoModel | undefined = this.productos_cotizados.find((p: ProductoModel) => {
        return p.id === id_producto;
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
  
              this.getCotizacion_Producto();
              this.mensaje.mostrarAlertaSuccess('Producto','El producto se agrego correctamente.');
              this.visible = false;
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

      const cotizacion_producto: CotizacionProductoModel | undefined = this.cotizacion_producto.find((c: CotizacionProductoModel) => {
        return c.id_producto === id_producto;
      });

      if(cotizacion_producto?.id == undefined) {

        this.mensaje.mostrarAlertaError('Error','Reporta el error por favor.');
        return;
      }

      this.cotizacionesProductoServices.deleteCotizacionesProductoById(token,cotizacion_producto.id).subscribe(
                
        (res) => {

          if (res.status == 200) {
              
            const body      : ResponseModel = res.body;
            const code      : string = body.code;
  
            if(code === '#DCPS') {
  
              this.getCotizacion_Producto();
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

  generarCotizacion() {

    if(this.cotizacion_producto.length == 0) {
      this.mensaje.mostrarAlertaError('Producto', 'Agrega un producto a la cotización');
      return;
    }

    console.log(this.cotizacion_producto);
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
