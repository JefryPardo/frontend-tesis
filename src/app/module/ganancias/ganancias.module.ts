import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GananciasComponent } from './ganancias.component';
import { InicioHubComponent } from './components/inicio-hub/inicio-hub.component';
import { GananciasRoutingModule } from './ganancias-routing.module';



@NgModule({
  declarations: [GananciasComponent, InicioHubComponent],
  imports: [
    CommonModule,
    GananciasRoutingModule
  ]
})
export class GananciasModule { }
