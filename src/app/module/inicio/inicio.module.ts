import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioHubComponent } from './components/inicio-hub/inicio-hub.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductosService } from 'src/app/service/productos.service';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';



@NgModule({
  declarations: [
    InicioComponent,
    InicioHubComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InicioRoutingModule,

  ],

  providers: [
    ProductosService
  ]
})
export class InicioModule { }
