import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mensaje: ToastService
  ) {

    this.formLogin = this.inicializarFormularioLogin();
  }

  inicializarFormularioLogin(): FormGroup {

    return this.fb.group({
      'usuario':          new FormControl("",       Validators.required),
      'clave':            new FormControl("",       Validators.required)
    });
  }

  campoInvalid(campo: string) {

    return this.formLogin.get(campo)?.invalid;
  }

  login() {

    if(this.formLogin.invalid) {
        
      if(this.campoInvalid('usuario'))   this.mensajeAlertaError('Correo:',    'Se requiere el correo.');
      if(this.campoInvalid('clave'))     this.mensajeAlertaError('Contraseña:','Se requiere la contraseña.');

      return Object.values(this.formLogin.controls).forEach(control => {

        control.markAsTouched();
      });

      
    }

    console.log(this.formLogin);
  }

  mensajeAlertaError(titulo: string, mensaje: string) {

    this.mensaje.mostrarAlertaError(titulo,mensaje);
  }

  validarCampo(campo: string) {
  
    return this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched;
  }
}
