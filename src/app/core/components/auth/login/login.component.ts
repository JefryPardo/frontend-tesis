import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/models/auth/login.model';
import { ToastService } from 'src/app/service/toast.service';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment';
import { ResponseModel } from 'src/app/models/model/response.model';
import { JwtService } from 'src/app/service/jwt.service';
import { RolService } from 'src/app/service/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;
  isLoading: boolean = false;

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

    this.isLoading = true;

    this.authService.login(login).subscribe(
      
      (res) => {

        if (res.status == 200) {

          const body: ResponseModel = res.body;
          const code : string = body.code;
          
          if( code == '#SL') {
            
            const token : string = body.response;
            this.controlLoginExitoso(token);
            this.isLoading = false;
            this.router.navigate(['app/catalogo']);     
            return;       
          }

          if(code == '#L02') {

            // Formato del correo no valido. // validacion por el BackEnd
            this.isLoading = false;
            this.mensaje.mostrarAlertaError('Correo',body.response);
            return;
          }

        } else if (res.status == 500) {

          const body: ResponseModel = res.body;
          const code : string = body.code;

          if (code === 'AUTH') {

            this.mensaje.mostrarAlertaError('Credenciales','credenciales NO validas.');
            this.isLoading = false;
            return;
          }

          if(code === '#feq') {

            this.mensaje.mostrarAlertaError('Error','Reporta el error por favor.');
            this.isLoading = false;
            return;
          }
        }

        this.isLoading = false;
        this.mensaje.mostrarAlertaError('Error','Algo salio mal.');
        return;
      },
      
      (err)=>{
        
        this.isLoading = false;
        this.mensaje.mostrarAlertaError('Spinner off','');
        return;
      }
    );
  }

  controlLoginExitoso(token : string) {

    localStorage.setItem(environment.nombreToken, token);
    this.rolService.roles = this.jwtService.decodeToken(token).roles;
  }

  register() {

    this.router.navigate(['/auth/register']);
  }


  mensajeAlertaError(titulo: string, mensaje: string) {

    this.mensaje.mostrarAlertaError(titulo,mensaje);
  }

  validarCampo(campo: string) {
  
    return this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched;
  }
}
