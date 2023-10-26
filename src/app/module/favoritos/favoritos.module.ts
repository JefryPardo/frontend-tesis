import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from './favoritos.component';
import { InicioHubComponent } from './components/inicio-hub/inicio-hub.component';
import { FavoritosRoutingModule } from './favoritos-routing.module';



@NgModule({
  declarations: [FavoritosComponent, InicioHubComponent],
  imports: [
    CommonModule,
    FavoritosRoutingModule
  ]
})
export class FavoritosModule { }
