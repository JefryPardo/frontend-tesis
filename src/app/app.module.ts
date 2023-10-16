import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ToastService } from './service/toast.service';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CotizacionesComponent,
    ConfiguracionesComponent,
    InicioComponent,
    CardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    MenubarModule,
    ToastModule,
    CardModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    DropdownModule

  ],
  providers: [MessageService,ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
