import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/model/producto.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastService } from './toast.service';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  producto        : ProductoModel;

  constructor(
    private http : HttpClient, 
    private mensaje: ToastService,
    private jwtService: JwtService
  ) { }

  public getProducto(id: string,token:string) : Observable<any>{

    return this.http.get(environment.api + '/producto/find/'+id,this.jwtService.getHttpOptionsWithToken(token)).pipe(
      catchError((err) => this.handleError(err, ['Error', 'Fallas consultando, inténtelo nuevamente.']))
    );
  }

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
