import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-producto-cotizacion',
  templateUrl: './producto-cotizacion.component.html',
  styleUrls: ['./producto-cotizacion.component.scss']
})
export class ProductoCotizacionComponent {

  @Input() producto : ProductoModel;
  @Input() favorito : boolean;
  @Input() delete   : boolean = false;

  @Output() dateChangedCrud = new EventEmitter<string>();
  @Output() dateChangedAdd = new EventEmitter<string>();

  cantidad: number = 1;

  constructor(private mensaje: ToastService) {
    if(this.producto == undefined) this.producto = new ProductoModel();
  }

  toggleFavorite(favorito: boolean) {

    this.favorito = !favorito;
    this.dateChangedCrud.emit(`favorito;${this.favorito}`);
  }
  
  toggleInsert(producto: ProductoModel) {

    const disponible:string = this.producto.unidades;
    const disponible_number = parseInt(disponible, 10);
    if(this.cantidad == null || this.cantidad > disponible_number) {

      this.mensaje.mostrarAlertaError('Cantidad', `catidad no disponible, maximo ${disponible_number}`);
      return;
    }

    this.dateChangedAdd.emit(`insert;${producto.id};${this.cantidad}`);
  }
  
  toggleDelete(producto: ProductoModel) {

    this.dateChangedCrud.emit(`delete;${producto.id}`);
  }



  cantidadMas() {
    const disponible:string = this.producto.unidades;
    const disponible_number = parseInt(disponible, 10);

    if (disponible_number > this.cantidad) {
      this.cantidad = this.cantidad + 1;
    }
  }
  
  cantidadMenos() {

    if(1 == this.cantidad) return;
    this.cantidad = this.cantidad-1;
  }

}
