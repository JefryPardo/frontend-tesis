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

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { NavbarMovilPublicoComponent } from './components/navbar-movil-publico/navbar-movil-publico.component';
import { CartaGridComponent } from './components/carta-grid/carta-grid.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { ProductosService } from '../service/productos.service';
import { OrderlistComponent } from './components/orderlist/orderlist.component';

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
    OrderlistComponent,
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
    OrderlistComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    MenubarModule,
    InputTextModule,
  ],
  providers: [ProductosService]
})
export class SharedModule {}
