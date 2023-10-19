import { NgModule } from '@angular/core';
import { ProductoComponent } from './producto.component';
import { InputPrecioNormalModule } from '../input-precio-normal/input-precio-normal.module';
import { InputPrecioOfertaModule } from '../input-precio-oferta/input-precio-oferta.module';
import { CartaModule } from '../carta/carta.module';


@NgModule({
declarations: [
    ProductoComponent
],

imports: [
    CartaModule,
    InputPrecioNormalModule,
    InputPrecioOfertaModule,
],

exports: [ProductoComponent],
  
providers: [],
bootstrap: []
})
export class ProductoModule { }