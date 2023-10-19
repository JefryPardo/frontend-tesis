import { NgModule } from '@angular/core';
import { NavbarMovilPublicoComponent } from './navbar-movil-publico.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@NgModule({
declarations: [
    NavbarMovilPublicoComponent
],

imports: [
    BrowserModule,
    CommonModule
],

exports: [NavbarMovilPublicoComponent],
  
providers: [],
bootstrap: []
})
export class NavbarMovilPublicoModule { }