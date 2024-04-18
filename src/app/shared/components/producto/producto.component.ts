import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Imagen } from 'src/app/models/interface/imagen.interface';
import { CotizacionProductoModel } from 'src/app/models/model/cotizacion-producto.model';
import { CotizacionModel } from 'src/app/models/model/cotizacion.model';
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
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  @Input() producto: ProductoModel;

  @Input() productos: ProductoModel[];
  @Input() productosPares: ProductoModel[];
  @Input() productosImpares: ProductoModel[];
  
  @Input() favorito: boolean;

  cotizaciones: CotizacionModel[] = [];
  resumen: ResumenModel = new ResumenModel();
  visible: boolean = false;

  cantidad: number = 1;

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private mensaje: ToastService,
    public cotizacionesServices: CotizacionesService,
    public cotizacionesProductoServices: CotizacionesProductoService,
    public resumenServices: ResumenService
  ) {

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
  
  toggleFavorite(favorito: boolean) {

    this.favorito = !favorito;
  }

  valorEntero(precio:number):number {
    
    const parteEntera: number = Math.floor(precio);

    return parteEntera;
  }

  valorDecimal(precio: number) {
    return this.obtenerParteDecimal(precio);
  }

  obtenerParteDecimal(numero: number): number {
    const parteEntera = Math.floor(numero);
    const parteDecimal = (numero - parteEntera) * 100;
    return Math.round(parteDecimal);
  }

  evaluarUnidades(unidades:number) {

    if(unidades == null || unidades == undefined) return '0';

    if(unidades>1000) return '1000+';
    
    return unidades.toString();
  }
  
  validarPrecio( producto :ProductoModel ) {

    return producto.precio < producto.precio_anterior;
  }

  onCardChanged(id_producto: string) {

    this.router.navigate(['app/catalogo/producto', id_producto]);
  }

  addProducto() {

    const disponible:string = this.producto.unidades;
    const disponible_number = parseInt(disponible, 10);
    if(this.cantidad == null || this.cantidad > disponible_number) {

      this.mensaje.mostrarAlertaError('Cantidad', `catidad no disponible, maximo ${disponible_number}`);
      return;
    }

    this.getListaCotizaciones();
  }

  getListaCotizaciones() {

    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      
      this.router.navigate(['auth/login']);
      return;
    }
    
    const decode:any = this.jwtService.decodeToken(token);

    const id_usuario  :string   = decode.sub;
    
    this.cotizacionesServices.getCotizacionesList(token,id_usuario).subscribe(
      (res) => {
      
        if (res.status == 200) {
            
          const body      : ResponseModel = res.body;
          const response  : CotizacionModel[] = body.response;
          this.cotizaciones = response;

          if(this.cotizaciones.length == 0) {

            this.mensaje.mostrarAlertaError('No hay cotizaciones','Cree una cotización.');
            return;
          }

          this.visible = true;
          return;

        } else if (res.status == 500) {

          const body  : ResponseModel = res.body;
          const code  : string = body.code;

          if(code === '#feq') {

            this.mensaje.mostrarAlertaError('Error','Reporta el error por favor.');
            return;
          }
          
          if(code === 'TOK02') {

            this.router.navigate(['auth/login']);
            this.mensaje.mostrarAlertaError('Sesión','Sesión expirada.');
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

  agregarCotizacion(cotizacion:CotizacionModel) {

    const producto: ResumenProductoModel | undefined = this.resumen.resumen_producto.find((data: ResumenProductoModel) => {
      return data.producto.id === this.producto.id;
    });

    if(producto) {

      this.mensaje.mostrarAlertaError('Producto','El producto ya se encuentra en la cotización.');
      return;
    }

    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      
      this.router.navigate(['auth/login']);
      return;
    }
    
    if(cotizacion.id == null) return;

    const cotizacion_producto:CotizacionProductoModel = {

      "cantidad": this.cantidad.toString(),
      "id_producto": this.producto.id,
      "id_cotizacion": cotizacion.id
    }

    this.cotizacionesProductoServices.createCotizacionProducto(token,cotizacion_producto).subscribe(
              
      (res) => {

        if (res.status == 200) {
            
          const body      : ResponseModel = res.body;
          const code      : string = body.code;

          if(code === '#ICPS') {

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

  cantidadMas() {
    const disponible:string = this.producto.unidades;
    const disponible_number = parseInt(disponible, 10);

    if (disponible_number > this.cantidad) {
      this.cantidad = this.cantidad + 1;
    }
  }
  
  cantidadMenos() {

    if(1 == this.cantidad) return;
    this.cantidad = this.cantidad-1;
  }

  getResumen(cotizacion:CotizacionModel) {

    if(cotizacion.id == null) return;
    const id =cotizacion.id;
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
            this.agregarCotizacion(cotizacion);
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
  }

}


