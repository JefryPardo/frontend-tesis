import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { GananciasComponent } from './components/ganancias/ganancias.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PrincipalComponent } from './principal.component';
import { PrincipalRoutingModule } from './principal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderListModule } from 'primeng/orderlist';
import { CotizacionesService } from '../service/cotizaciones.service';

@NgModule({
  declarations: [
    CotizacionesComponent,
    FavoritosComponent,
    GananciasComponent,
    InicioComponent,
    PerfilComponent,
    PrincipalComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    PrincipalRoutingModule,

    OrderListModule
  ],

  providers: [CotizacionesService]
  
})
export class PrincipalModule { }
