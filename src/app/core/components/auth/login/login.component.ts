import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/auth/login.model';
import { ToastService } from 'src/app/service/toast.service';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/app/models/model/response.model';
import { JwtService } from 'src/app/service/jwt.service';
import { LoginResponseModel } from 'src/app/models/auth/login.response.model';
import { RolService } from 'src/app/service/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mensaje: ToastService,
    private authService: AuthService,
    private jwtService: JwtService,
    public  rolService: RolService,
    private router: Router,
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

    const login:LoginModel = {

      "usuario": this.formLogin.value.usuario,
      "clave": this.formLogin.value.clave
    }

    this.authService.login(login).subscribe(
      
      (res) => {

        if (res.status == 200) {

          const body: ResponseModel = res.body;
          const code : string = body.code;
          
          if( code == '#SL') {
            
            const response : LoginResponseModel = body.response;
            this.controlLoginExitoso(response);
            this.router.navigate(['/app']);            
          }

          if(code == '#L02') {

            this.mensaje.mostrarAlertaError('Correo',body.response);
            return;
          }

        } else if (res.status == 500) {

          const body: ResponseModel = res.body;
          const code : string = body.code;

          if (code === 'AUTH') {

            this.mensaje.mostrarAlertaError('Credenciales','credenciales NO validas.');
            return;
          }

          if(code === '#feq') {

            this.mensaje.mostrarAlertaError('Error','Reporta el error por favor.');
            return;
          }
        }

        this.mensaje.mostrarAlertaError('Error','Algo salio mal.');
        return;
      },
      
      (err)=>{
        
        this.mensaje.mostrarAlertaError('Error','Algo salio mal.');
        return;
      }
    );
  }

  controlLoginExitoso(response : LoginResponseModel) {

    localStorage.setItem(environment.nombreToken, response.token);
    this.rolService.roles = response.roles;
    // console.log(this.jwtService.getTokenExpirationDate(token));
  }

  token() {

    const token = localStorage.getItem(environment.nombreToken);

    console.log('token: ',token);

    if(token == null || token == undefined ) return;

    console.log(this.jwtService.decodeToken(token).roles);
    console.log(this.jwtService.isTokenExpired(token));
    console.log(this.jwtService.getTokenExpirationDate(token));
  }


  mensajeAlertaError(titulo: string, mensaje: string) {

    this.mensaje.mostrarAlertaError(titulo,mensaje);
  }

  validarCampo(campo: string) {
  
    return this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched;
  }
}
