import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CotizacionesService } from '../service/cotizaciones.service';

import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    PrincipalComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    PrincipalRoutingModule,

    OrderListModule,
    ButtonModule
  ],

  providers: [CotizacionesService]
  
})
export class PrincipalModule { }
