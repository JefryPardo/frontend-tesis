import { NgModule } from '@angular/core';
import { CartaComponent } from './carta.component';
import { NumberModule } from 'src/app/pipe/number.module';
import { CommonModule } from '@angular/common';


@NgModule({
declarations: [
    CartaComponent,
],

imports: [
    NumberModule,
    CommonModule    
],

exports: [CartaComponent],
  
providers: [],
bootstrap: []
})
export class CartaModule { }