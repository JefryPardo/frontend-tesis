import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastService } from "./toast.service";
import { JwtService } from "./jwt.service";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { CotizacionProductoModel } from "../models/model/cotizacion-producto.model";
import { MailModel } from "../models/model/mail.model";

@Injectable({
    providedIn: 'root'
  })
export class CotizacionesProductoService {

    constructor(
        private http : HttpClient, 
        private mensaje: ToastService,
        private jwtService: JwtService    
    ) {}

    public createCotizacionProducto(token:string, data: CotizacionProductoModel) : Observable<any>{

        return this.http.post(environment.api + '/cotizacion-producto/insert', data ,this.jwtService.getHttpOptionsWithToken(token)).pipe(
          catchError((err) => this.handleError(err, ['Error', 'Fallas iniciando sesion, inténtelo nuevamente.']))
        );
    }
    
    public deleteCotizacionesProductoById(token:string, id_cotizacion:string,id_producto:string) : Observable<any> {

        return this.http.delete(environment.api + `/cotizacion-producto/delete/${id_cotizacion}/${id_producto}`,this.jwtService.getHttpOptionsWithToken(token)).pipe(
            catchError((err) => this.handleError(err, ['Error', 'Fallas consultando, inténtelo nuevamente.']))
        );
    }

    private handleError(error: HttpErrorResponse, clientMessage: string[]) {
        this.mensaje.mostrarAlertaError(clientMessage[0],clientMessage[1]);
        return throwError(clientMessage);
    }
}