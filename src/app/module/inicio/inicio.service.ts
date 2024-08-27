import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { JwtService } from 'src/app/service/jwt.service';
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
export class InicioService {

  constructor(
    private http : HttpClient, 
    private mensaje: ToastService,
    private jwtService: JwtService
  ) {}

  public getProductos(token:string) : Observable<any>{

    return this.http.get(environment.api + '/producto/all',this.jwtService.getHttpOptionsWithToken(token)).pipe(
      catchError((err) => this.handleError(err, ['Error', 'Fallas consultando, inténtelo nuevamente.']))
    );
  }

  private handleError(error: HttpErrorResponse, clientMessage: string[]) {
    this.mensaje.mostrarAlertaError(clientMessage[0],clientMessage[1]);
    return throwError(clientMessage);
  }
}
