import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { InicioHubComponent } from './components/inicio-hub/inicio-hub.component';



@NgModule({
  declarations: [
    PerfilComponent,
    InicioHubComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
