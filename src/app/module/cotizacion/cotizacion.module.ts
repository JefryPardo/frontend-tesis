import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CotizacionesService } from 'src/app/service/cotizaciones.service';

import { SharedModule } from 'src/app/shared/shared.module';

import { CotizacionRoutingModule } from './cotizacion-routing.module';

import { CotizacionComponent } from './cotizacion.component';
import { ListaCotizacionesComponent } from './components/lista-cotizaciones/lista-cotizaciones.component';
import { CotizacionHubComponent } from './components/cotizacion-hub/cotizacion-hub.component';
import { CreateCotizacionComponent } from './components/create-cotizacion/create-cotizacion.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { GridProductoComponent } from './components/grid-producto/grid-producto.component';
import { ProductoCotizadoComponent } from './components/producto/producto.component';

@NgModule({
  declarations: [
    CotizacionComponent,
    ListaCotizacionesComponent,
    CreateCotizacionComponent,
    CotizacionHubComponent,
    GridProductoComponent,
    ProductoCotizadoComponent
  ],
  imports: [
    CommonModule,
    CotizacionRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,

    SharedModule,

    DialogModule,
    CalendarModule,
    InputTextModule,
    ScrollPanelModule,
    TabViewModule,
  ],

  providers: [
    CotizacionesService
  ]
})
export class CotizacionModule { }
