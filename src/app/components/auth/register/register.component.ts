import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/service/toast.service';


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
    private mensaje: ToastService
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
    console.log(this.formRegistro);
  }

  mensajeAlertaError(titulo: string, mensaje: string) {

    this.mensaje.mostrarAlertaError(titulo,mensaje);
  }

  validarCampo(campo: string) {
  
    return this.formRegistro.get(campo)?.invalid && this.formRegistro.get(campo)?.touched;
  }
}
