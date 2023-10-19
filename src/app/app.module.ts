import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { NavbarComponent } from './components/utils/navbar/navbar.component';
import { ToastService } from './service/toast.service';
import { CotizacionesComponent } from './components/modulos/cotizaciones/cotizaciones.component';
import { PerfilComponent } from './components/modulos/perfil/perfil.component';
import { FavoritosComponent } from './components/modulos/favoritos/favoritos.component';
import { GananciasComponent } from './components/modulos/ganancias/ganancias.component';
import { BannerModule } from './components/utils/banner/banner.module';



@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    // CotizacionesComponent,
    // PerfilComponent,
    // FavoritosComponent,
    // GananciasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    MenubarModule,
    ToastModule,
    BannerModule
  ],
  exports: [],
  providers: [MessageService,ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
