import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CotizacionModel } from 'src/app/models/model/cotizacion.model';
import { ResponseModel } from 'src/app/models/model/response.model';
import { CotizacionesService } from 'src/app/service/cotizaciones.service';
import { JwtService } from 'src/app/service/jwt.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-create-cotizacion',
  templateUrl: './create-cotizacion.component.html',
  styleUrls: ['./create-cotizacion.component.scss']
})
export class CreateCotizacionComponent {

  visible: boolean = false;
  formCotizacion: FormGroup;

  @Output() newSave = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private mensaje: ToastService,
    private jwtService: JwtService,
    private router: Router,
    private cotizacionesServices: CotizacionesService
  ) {

    this.formCotizacion = this.inicializarFormularioCotizacion();
  }

  inicializarFormularioCotizacion(): FormGroup {

    return this.fb.group({
      'nombre':             new FormControl("",Validators.required),
      'fecha_vencimiento':  new FormControl("",),
      'nombre_cliente':     new FormControl("",),
      'cedula_cliente':     new FormControl("",),
      'correo_cliente':     new FormControl("",)
    });
  }

  validarCampo(campo: string) {
  
    return this.formCotizacion.get(campo)?.invalid && this.formCotizacion.get(campo)?.touched;
  }

  mensajeAlertaError(titulo: string, mensaje: string) {

    this.mensaje.mostrarAlertaError(titulo,mensaje);
  }

  campoInvalid(campo: string) {

    return this.formCotizacion.get(campo)?.invalid;
  }

  showDialog(){

    this.visible = !this.visible;
  }

  crearCotizacion() {

    if(this.formCotizacion.invalid) {
        
      if(this.campoInvalid('nombre'))   this.mensajeAlertaError('Nombre:',    'Se requiere el nombre.');

      return Object.values(this.formCotizacion.controls).forEach(control => {

        control.markAsTouched();
      });
    }

    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      
      this.router.navigate(['auth/login']);
      return;
    }

    const decode:any = this.jwtService.decodeToken(token);

    const id_usuario  :string   = decode.sub;

    const cotizacion:CotizacionModel = {

      "nombre"        :     this.formCotizacion.value.nombre,
      "fecha_vencimiento":  this.validarCampoUndefined(this.formCotizacion.value.fecha_vencimiento),
      "nombre_cliente":     this.validarCampoUndefined(this.formCotizacion.value.nombre_cliente),
      "cedula_cliente":     this.validarCampoUndefined(this.formCotizacion.value.cedula_cliente),
      "correo_cliente":     this.validarCampoUndefined(this.formCotizacion.value.correo_cliente),
      "id_usuario":         id_usuario,
    }

    if(cotizacion.fecha_vencimiento != null && cotizacion.fecha_vencimiento.length > 0) {
      
      cotizacion.fecha_vencimiento = this.setFormatoFecha(cotizacion.fecha_vencimiento);
    }
    
    this.cotizacionesServices.createCotizacion(token,cotizacion).subscribe(
      (res) => {

        if (res.status == 200) {
            
          const body      : ResponseModel = res.body;
          const code  : string = body.code;
          const response  : string = body.response;

          if(code === '#CS') {

            this.formCotizacion.reset();
            this.onNewSave();
            this.showDialog();
            this.mensaje.mostrarAlertaSuccess('Creada','Nueva cotización creada');
            this.router.navigate(['app/cotizacion']);
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

  setFormatoFecha(input: string):string {

    const fecha = new Date(input);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;

    return fechaFormateada;
  }

  onNewSave() {
    
    this.newSave.emit(true);
  }

  validarCampoUndefined(campo: any) {

    return campo == undefined? null:campo;
  }
}
