import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal.component';
import { InicioComponent } from './inicio/inicio.component';



const routes: Routes = [
  { path: '', component: PrincipalComponent , children:
    [
      { path:'' , redirectTo: 'inicio', pathMatch: 'full' },
      { path:'inicio',      loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
      { path:'cotizacion',  loadChildren: () => import('./cotizacion/cotizacion.module').then(m => m.CotizacionModule) },
      { path:'**', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
