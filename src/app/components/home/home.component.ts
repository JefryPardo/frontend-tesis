import { Component } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  productos: ProductoModel[] = [];
  productosPares: ProductoModel[];
  productosImpares: ProductoModel[];

  constructor() {
    
    this.productos = this.getListProducto();

    this.productosPares   = this.productos.filter((_, index) => index % 2 === 0);
    this.productosImpares = this.productos.filter((_, index) => index % 2 !== 0);
  }

  buildProducto(
    id:string,
    nombre:string,
    descripcion:string,
    url_imagen:string,
    referencia:string,
    referencia_local:string,
    precio:number,
    ficha_tecnica:string,
    unidades:number,
    estado:string,
    precio_anterior:number,
    id_categoria:string,
    id_tipo:string,
    id_marca:string,
  ) {
    
    let producto = new ProductoModel();
    
    producto.id                = id;
    producto.nombre            = nombre;
    producto.descripcion       = descripcion;
    producto.url_imagen        = url_imagen;
    producto.referencia        = referencia;
    producto.referencia_local  = referencia_local;
    producto.precio            = precio;
    producto.ficha_tecnica     = ficha_tecnica;
    producto.unidades          = unidades;
    producto.estado            = estado;
    producto.precio_anterior   = precio_anterior;
    producto.id_categoria      = id_categoria;
    producto.id_tipo           = id_tipo;
    producto.id_marca          = id_marca;

    return producto;
  }

  getListProducto() {

    
    let producto1 = this.buildProducto(
      '1234',
      'Camara 1',
      'Camara de 20mp',
      'https://media.istockphoto.com/id/1405489463/es/foto/vista-de-tres-cuartos-de-la-c%C3%A1mara-de-vigilancia-varifocal-con-una-casa-al-fondo.jpg?s=1024x1024&w=is&k=20&c=fGv5sPwdXqu7r9CUqceZK87orPMd77pGnixu2ALF9Yw=',
      'REF123',
      'REFL123',
      78140.12,
      '',
      1420,
      'activo',
      0,
      '1',
      '2',
      '3',
    );
    
    let producto2 = this.buildProducto(
      '1235',
      'Camara 2',
      'Camara de 30mp',
      'https://media.istockphoto.com/id/501919330/es/foto/c%C3%A1mara-cctv-de-seguridad-en-pared-de-piedra.jpg?s=1024x1024&w=is&k=20&c=6PbH17LHQ7jUdaw9dlOg838HfcNvmmODqIZ43qzdD24=',
      'REF123',
      'REFL123',
      91952.11,
      '',
      521,
      'activo',
      121351.14,
      '1',
      '2',
      '3',
    );
    
    let producto3 = this.buildProducto(
      '1235',
      'Cable z',
      'Cable z',
      'https://media.istockphoto.com/id/1366442458/es/vector/cable-de-cobre-cable-el%C3%A9ctrico-multin%C3%BAcleo-realista-con-aislamiento-de-color-ilustraci%C3%B3n-del.jpg?s=2048x2048&w=is&k=20&c=JAOXjhgUN9f3kQ4iM3EkwJmr40NKdLAXBl9qYdM5-I0=',
      'REF123',
      'REFL123',
      1090952.60,
      '',
      521,
      'activo',
      0,
      '1',
      '2',
      '3',
    );
    
    let producto4 = this.buildProducto(
      '1235',
      'Camara 6',
      'Camara de 40mp',
      'https://media.istockphoto.com/id/621490546/es/foto/c%C3%A1mara-de-v%C3%ADdeo-sistema-de-seguridad-cctv.jpg?s=1024x1024&w=is&k=20&c=kf_ziygtvtpFe_j3ke_K66gvbgsD5kQt0wDuq5SBgLo=',
      'REF123',
      'REFL123',
      1590952.60,
      '',
      521,
      'activo',
      0,
      '1',
      '2',
      '3',
    );
    
    let producto5 = this.buildProducto(
      '1235',
      'Cable x',
      'Cable x',
      'https://media.istockphoto.com/id/949342670/es/foto/cable-de-alimentaci%C3%B3n-el%C3%A9ctrica-sobre-fondo-blanco.jpg?s=2048x2048&w=is&k=20&c=6Wc6fhckngdhORlfB7lNciQWs1TtKbRN6z6r_5lBVfE=',
      'REF123',
      'REFL123',
      90952.60,
      '',
      521,
      'activo',
      1590952.15,
      '1',
      '2',
      '3',
    );

    let data: ProductoModel[] = [];
    data.push(producto1);
    data.push(producto2);
    data.push(producto3);
    data.push(producto4);
    data.push(producto5);

    return data;
  }
}
