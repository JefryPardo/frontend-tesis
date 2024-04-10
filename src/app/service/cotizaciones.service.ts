import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';
import { JwtService } from './jwt.service';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CotizacionModel } from '../models/model/cotizacion.model';
import { MailModel } from '../models/model/mail.model';
import { CotizacionHistorialModel } from '../models/model/cotizacion-historial.model';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {

  constructor(
    private http : HttpClient, 
    private mensaje: ToastService,
    private jwtService: JwtService    
  ) {}

  public getCotizacionesList(token:string, id_usuario:string) : Observable<any> {

    return this.http.get(environment.api + `/cotizacion/all/by/usuario/${id_usuario}`,this.jwtService.getHttpOptionsWithToken(token)).pipe(
      catchError((err) => this.handleError(err, ['Error', 'Fallas consultando, inténtelo nuevamente.']))
    );
  }

  public createCotizacion(token:string, data: CotizacionModel) : Observable<any>{

    return this.http.post(environment.api + '/cotizacion/insert', data ,this.jwtService.getHttpOptionsWithToken(token)).pipe(
      catchError((err) => this.handleError(err, ['Error', 'Fallas iniciando sesion, inténtelo nuevamente.']))
    );
  }

  public getCotizacion(token:string, id:string) : Observable<any> {

    return this.http.get(environment.api + `/cotizacion/find/${id}`,this.jwtService.getHttpOptionsWithToken(token)).pipe(
      catchError((err) => this.handleError(err, ['Error', 'Fallas consultando, inténtelo nuevamente.']))
    );
  }

  public enviarEmail(token:string, cotizacion_historial: CotizacionHistorialModel) : Observable<any>{

    return this.http.post(environment.api + '/mail/enviar-correo', cotizacion_historial ,this.jwtService.getHttpOptionsWithToken(token)).pipe(
      catchError((err) => this.handleError(err, ['Error', 'Fallas iniciando sesion, inténtelo nuevamente.']))
    );
  }

  private handleError(error: HttpErrorResponse, clientMessage: string[]) {
    this.mensaje.mostrarAlertaError(clientMessage[0],clientMessage[1]);
    return throwError(clientMessage);
  }
}
