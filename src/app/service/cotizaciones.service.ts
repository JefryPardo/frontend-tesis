import { Injectable } from '@angular/core';
import { CotizacionModel } from '../models/model/cotizacion.model';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {

  cotizacion    : CotizacionModel;
  cotizaciones  : CotizacionModel[];

  constructor() {

    this.cotizaciones = this.getListCotizaciones();
  }

  builCotizacion(
    id                  : string, 
    nombre              : string, 
    fecha_creacion      : string,
    fecha_vencimiento   : string,
    nombre_cliente      : string,
    cedula_cliente      : string,
    correo_cliente      : string,
    id_usuario          : string
  ) {

    let cotizacion = new CotizacionModel();
    
    cotizacion.id                = id;
    cotizacion.nombre            = nombre;
    cotizacion.fecha_creacion    = fecha_creacion;
    cotizacion.fecha_vencimiento = fecha_vencimiento;
    cotizacion.nombre_cliente    = nombre_cliente;
    cotizacion.cedula_cliente    = cedula_cliente;
    cotizacion.correo_cliente    = correo_cliente;
    cotizacion.id_usuario        = id_usuario;

    return cotizacion;
  }

  getListCotizaciones() {

    
    let cotizacion1 = this.builCotizacion(
      '1234',
      'Cotizacion #1',
      '20/10/2023',
      '20/10/2024',
      'Jefry',
      '1107102699',
      'jeffryjhoan1996@gmail.com',
      'idcliente'
    );
    
    let cotizacion2 = this.builCotizacion(
      '1234',
      'Cotizacion #1',
      '20/10/2023',
      '20/10/2024',
      'Jefry',
      '1107102699',
      'jeffryjhoan1996@gmail.com',
      'idcliente'
    );

    let cotizacion3 = this.builCotizacion(
      '1234',
      'Cotizacion #1',
      '20/10/2023',
      '20/10/2024',
      'Jefry',
      '1107102699',
      'jeffryjhoan1996@gmail.com',
      'idcliente'
    );
   

    let data: CotizacionModel[] = [];
    data.push(cotizacion1);
    data.push(cotizacion2);
    data.push(cotizacion3);

    return data;
  }
}
