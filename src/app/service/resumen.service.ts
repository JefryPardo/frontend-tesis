import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  constructor(
    private http : HttpClient, 
    private mensaje: ToastService,
    private jwtService: JwtService    
  ) {}

  public getResumen(token:string, id_cotizacion:string) : Observable<any> {

    return this.http.get(environment.api + `/resumen/find/${id_cotizacion}`,this.jwtService.getHttpOptionsWithToken(token)).pipe(
      catchError((err) => this.handleError(err, ['Error', 'Fallas consultando, inténtelo nuevamente.']))
    );
  }

  private handleError(error: HttpErrorResponse, clientMessage: string[]) {
    this.mensaje.mostrarAlertaError(clientMessage[0],clientMessage[1]);
    return throwError(clientMessage);
  }
}
