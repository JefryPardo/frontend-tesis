import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CotizacionModel } from 'src/app/models/model/cotizacion.model';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { ResponseModel } from 'src/app/models/model/response.model';
import { CotizacionesService } from 'src/app/service/cotizaciones.service';
import { JwtService } from 'src/app/service/jwt.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-lista-cotizaciones',
  templateUrl: './lista-cotizaciones.component.html',
  styleUrls: ['./lista-cotizaciones.component.scss']
})
export class ListaCotizacionesComponent {

  cotizaciones: CotizacionModel[] = [];

  constructor(
    public cotizacionesServices: CotizacionesService,
    private router: Router,
    private jwtService: JwtService,
    private mensaje: ToastService
  ) {

    this.getListaCotizaciones();
  }

  getListaCotizaciones() {

    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      
      this.router.navigate(['auth/login']);
      return;
    }
    
    const decode:any = this.jwtService.decodeToken(token);

    const roles       :string[] = decode.roles;
    const id_usuario  :string   = decode.sub;
    
    this.cotizacionesServices.getCotizacionesList(token,id_usuario).subscribe(
      (res) => {
      
        if (res.status == 200) {
            
          const body      : ResponseModel = res.body;
          const response  : CotizacionModel[] = body.response;
          this.cotizaciones = response;

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

          console.log(res);
          this.mensaje.mostrarAlertaError('Error','Algo salio mal.');
          return;
        },
        (err)=>{
          
          this.mensaje.mostrarAlertaError('Spinner off','');
          return;
        }
    );
  }

  nuevoSave(emitido: boolean) {

    if(emitido) this.getListaCotizaciones();
  }
}
