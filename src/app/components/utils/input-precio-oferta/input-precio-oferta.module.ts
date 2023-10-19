import { NgModule } from '@angular/core';
import { InputPrecioNormalModule } from '../input-precio-normal/input-precio-normal.module';
import { InputPrecioOfertaComponent } from './input-precio-oferta.component';
import { NumberModule } from 'src/app/pipe/number.module';
import { CommonModule } from '@angular/common';


@NgModule({
declarations: [
    InputPrecioOfertaComponent,
],

imports: [
    InputPrecioNormalModule,
    NumberModule,
    CommonModule
],

exports: [InputPrecioOfertaComponent],
  
providers: [],
bootstrap: []
})
export class InputPrecioOfertaModule { }