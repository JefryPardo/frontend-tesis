import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/model/usuario.model';
import { ToastService } from 'src/app/service/toast.service';
import { AuthService } from '../service/auth.service';
import { ResponseModel } from 'src/app/models/model/response.model';
import { Router } from '@angular/router';


interface TipoDocumentoI {
  name: string;
  code: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formRegistro: FormGroup;

  tipo_documento          : TipoDocumentoI[]  | undefined;
  selected_tipo_documento : TipoDocumentoI    | undefined;

  constructor(
    private fb: FormBuilder, 
    private mensaje: ToastService,
    private authService: AuthService,
    private router: Router,
  ) {

    this.formRegistro = this.inicializarFormularioLogin();
    
    this.tipo_documento = [
      { name: 'Cedula', code: '1' },
      { name: 'Pasaporte', code: '2' }
    ];
    
  }

  campoInvalid(campo: string) {

    return this.formRegistro.get(campo)?.invalid;
  }



  inicializarFormularioLogin(): FormGroup {

    return this.fb.group({
      'nombre':           new FormControl("",       Validators.required),
      'apellido':         new FormControl("",       Validators.required),
      'direccion':        new FormControl("",       Validators.required),
      'celular':          new FormControl("",       Validators.required),
      'tipo_documento':   new FormControl("",       Validators.required),
      'documento':        new FormControl("",       Validators.required),
      'clave':            new FormControl("",       Validators.required),
      'usuario':          new FormControl("",       Validators.required)
    });
  }

  register() {
    
    console.log(this.formRegistro.value);

    if(this.formRegistro.invalid) {
        
      if(this.campoInvalid('nombre'))         this.mensajeAlertaError('Nombre:',          'Se requiere el nombre.');
      if(this.campoInvalid('apellido'))       this.mensajeAlertaError('Apellido:',        'Se requiere la apellido.');
      if(this.campoInvalid('direccion'))      this.mensajeAlertaError('Direccion:',       'Se requiere la direccion.');
      if(this.campoInvalid('celular'))        this.mensajeAlertaError('Celular:',         'Se requiere la celular.');
      if(this.campoInvalid('tipo_documento')) this.mensajeAlertaError('Tipo documento:',  'Se requiere la tipo_documento.');
      if(this.campoInvalid('documento'))      this.mensajeAlertaError('Documento:',       'Se requiere la documento.');
      if(this.campoInvalid('clave'))          this.mensajeAlertaError('Clave:',           'Se requiere la clave.');
      if(this.campoInvalid('usuario'))        this.mensajeAlertaError('Correo:',          'Se requiere la correo.');

      return Object.values(this.formRegistro.controls).forEach(control => {

        control.markAsTouched();
      });
    }

    const usuario: UsuarioModel = {
      
      "id":                 '',
      "nombre":             this.formRegistro.value.nombre,
      "apellido":           this.formRegistro.value.apellido,
      "direccion":          this.formRegistro.value.direccion,
      "celular":            this.formRegistro.value.celular,
      "tipo_documento":     this.formRegistro.value.tipo_documento.code,
      "documento":          this.formRegistro.value.documento,
      "fecha_creacion":     this.formRegistro.value.fecha_creacion,
      "intentos_fallidos":  this.formRegistro.value.intentos_fallidos,
      "clave":              this.formRegistro.value.clave,
      "usuario":            this.formRegistro.value.usuario,
      "estado":             this.formRegistro.value.estado
    }

    console.log(usuario);

    this.authService.register(usuario).subscribe(
      
      (res) => {

        if (res.status == 200) {

          const body: ResponseModel = res.body;
          const code : string = body.code;
          const mensaje : string = body.response;


        } else if (res.status == 500) {

          const body: ResponseModel = res.body;
          const code : string = body.code;
          
          if (code === '#R02') {
            
            this.mensaje.mostrarAlertaError('Correo','correo no disponible.');
            return;
          }
          if (code === '#R03') {
            
            const mensajes : string[] = body.response;

            mensajes.forEach(mensaje => {
              
              this.mensaje.mostrarAlertaError('Contraseña',mensaje);
            });

            return;
          }


        }
      },
      (err)=>{


      }
    );

  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  mensajeAlertaError(titulo: string, mensaje: string) {

    this.mensaje.mostrarAlertaError(titulo,mensaje);
  }

  validarCampo(campo: string) {
  
    return this.formRegistro.get(campo)?.invalid && this.formRegistro.get(campo)?.touched;
  }
}
