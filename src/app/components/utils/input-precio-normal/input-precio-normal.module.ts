import { NgModule } from '@angular/core';
import { InputPrecioNormalComponent } from './input-precio-normal.component';
import { NumberModule } from 'src/app/pipe/number.module';
import { CommonModule } from '@angular/common';


@NgModule({
declarations: [
    InputPrecioNormalComponent,
],

imports: [
    NumberModule,
    CommonModule
],

exports: [InputPrecioNormalComponent],
  
providers: [],
bootstrap: []
})
export class InputPrecioNormalModule { }