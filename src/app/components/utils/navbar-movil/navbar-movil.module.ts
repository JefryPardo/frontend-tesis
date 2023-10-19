import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarMovilComponent } from './navbar-movil.component';
import { CommonModule } from '@angular/common';


@NgModule({
declarations: [
    NavbarMovilComponent
],

imports: [
    BrowserModule,
    CommonModule
],

exports: [NavbarMovilComponent],
  
providers: [],
bootstrap: []
})
export class NavbarMovilModule { }