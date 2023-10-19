import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PublicoComponent } from './publico.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SearchModule } from '../utils/search/search.module';
import { BannerModule } from '../utils/banner/banner.module';
import { NavbarMovilPublicoModule } from '../utils/navbar-movil-publico/navbar-movil-publico.module';
import { CartaModule } from '../utils/carta/carta.module';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';



@NgModule({
declarations: [
  PublicoComponent,
  LoginComponent,
  RegisterComponent,
  HomeComponent,
],

imports: [
  CardModule,
  CommonModule,
  BrowserModule,
  SearchModule,
  BannerModule,
  CartaModule,
  NavbarMovilPublicoModule,
  ButtonModule,
  PasswordModule,
  InputTextModule,
  InputNumberModule,
  DropdownModule,
  FormsModule,
  ReactiveFormsModule,
],
  
providers: [],
bootstrap: [PublicoComponent]
})
export class PublicoModule { }