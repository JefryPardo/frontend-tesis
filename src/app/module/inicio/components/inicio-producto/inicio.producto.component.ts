import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { ResponseModel } from 'src/app/models/model/response.model';
import { ProductosService } from 'src/app/service/productos.service';
import { ToastService } from 'src/app/service/toast.service';
import { InicioService } from '../../inicio.service';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-inicio-producto',
  templateUrl: './inicio.producto.component.html',
  styleUrls: ['./inicio.producto.component.scss']
})
export class InicioProductoComponent implements OnInit {

  estado:boolean = false;
  producto: ProductoModel;
  productos: ProductoModel[] = [];

  filteredProductosImpares  : ProductoModel[];
  filteredProductosPares: ProductoModel[];
  
  productosPares  : ProductoModel[];
  productosImpares: ProductoModel[];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductosService,
    private mensaje: ToastService,
    private inicioService: InicioService,
    private router: Router,
    private jwtService: JwtService
  ){}

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      
      const id = params['id'];

      this.productoService.getProducto(id).subscribe(producto => {
        
        this.producto = producto.body;
        console.log(this.producto);
        this.getListProducto();
        this.estado = true;
        console.log('termino');
      });
    });

  }

  getListProducto():void {
    
    const token: string | null = this.jwtService.getToken();

    if(token == null) {
      // sesion expirada
      this.router.navigate(['auth/login']);
      return;
    }
    
    if(this.jwtService.isTokenExpired(token)) {
      
      // sesion expirada
      this.router.navigate(['auth/login']);
      return;
    }

    this.inicioService.getProductos(token).subscribe(
      
      (res) => {

        if (res.status == 200) {
          
          const body: ResponseModel = res.body;
          const response : ProductoModel[] = body.response;

          this.productos = response;
          this.filteredProductosPares   = this.productos.filter((_, index) => index % 2 === 0);
          this.filteredProductosImpares = this.productos.filter((_, index) => index % 2 !== 0);
          
          this.productosPares   = this.productos.filter((_, index) => index % 2 === 0);
          this.productosImpares = this.productos.filter((_, index) => index % 2 !== 0);

          console.log('end');
          return;

        } else if (res.status == 500) {

          const code: string = res.body.code;
          
          if(code === "TOK02") {

            // sesion expirada
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
}
