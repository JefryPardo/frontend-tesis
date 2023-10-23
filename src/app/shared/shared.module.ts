import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { BannerComponent } from './components/banner/banner.component';
import { CartaComponent } from './components/carta/carta.component';
import { InputPrecioNormalComponent } from './components/input-precio-normal/input-precio-normal.component';
import { InputPrecioOfertaComponent } from './components/input-precio-oferta/input-precio-oferta.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductoComponent } from './components/producto/producto.component';
import { SearchComponent } from './components/search/search.component';
import { NumberPipe } from './pipe/number.pipe';

import { NavbarMovilComponent } from './components/navbar-movil/navbar-movil.component';

import { NavbarMovilPublicoComponent } from './components/navbar-movil-publico/navbar-movil-publico.component';
import { CartaGridComponent } from './components/carta-grid/carta-grid.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { ProductosService } from '../service/productos.service';

import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { TituloComponent } from './components/titulo/titulo.component';
import { OrderlistCotizacionesComponent } from './components/orderlist-cotizaciones/orderlist-cotizaciones.component';

@NgModule({
  
  declarations: [

    NumberPipe,

    BannerComponent,
    CartaComponent,
    InputPrecioNormalComponent,
    InputPrecioOfertaComponent,
    NavbarComponent,
    NavbarMovilComponent,
    NavbarMovilPublicoComponent,
    ProductoComponent,
    SearchComponent,
    CartaGridComponent,
    CarruselComponent,
    TituloComponent,
    OrderlistCotizacionesComponent
  ],

  exports: [

    NumberPipe,

    BannerComponent,
    CartaComponent,
    InputPrecioNormalComponent,
    InputPrecioOfertaComponent,
    NavbarComponent,
    NavbarMovilComponent,
    NavbarMovilPublicoComponent,
    ProductoComponent,
    SearchComponent,
    CartaGridComponent,
    TituloComponent,
    OrderlistCotizacionesComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    MenubarModule,
    InputTextModule,
    OrderListModule,
    ButtonModule,
    DialogModule,
    CalendarModule

  ],
  providers: [ProductosService]
})
export class SharedModule {}
