import {  HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginModel } from 'src/app/models/auth/login.model';
import { UsuarioModel } from 'src/app/models/model/usuario.model';
import { ToastService } from 'src/app/service/toast.service';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private mensaje: ToastService) { }

  public login(data: LoginModel) : Observable<any>{

    return this.http.post(environment.api + '/auth/login', data ,httpOptions).pipe(
      catchError((err) => this.handleError(err, ['Inicio Sesion', 'Fallas iniciando sesion, inténtelo nuevamente.']))
    );
  }

  public register(data: UsuarioModel) : Observable<any>{

    return this.http.post(environment.api + '/auth/register', data ,httpOptions).pipe(
      catchError((err) => this.handleError(err, ['Registro', 'Fallas en registro, inténtelo nuevamente.']))
    );
  }

  private handleError(error: HttpErrorResponse, clientMessage: string[]) {
    this.mensaje.mostrarAlertaError(clientMessage[0],clientMessage[1]);
    return throwError(clientMessage);
  }

}
