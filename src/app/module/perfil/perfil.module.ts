import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { InicioHubComponent } from './components/inicio-hub/inicio-hub.component';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    PerfilComponent,
    InicioHubComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    DividerModule,
    CardModule,
    ButtonModule
  ]
})
export class PerfilModule { }
