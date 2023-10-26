import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal.component';



const routes: Routes = [
  { path: '', component: PrincipalComponent , children:
    [
      { path:'' , redirectTo: 'inicio', pathMatch: 'full' },
      { path:'catalogo',      loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
      { path:'cotizacion',  loadChildren: () => import('./cotizacion/cotizacion.module').then(m => m.CotizacionModule) },
      { path:'perfil',      loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
      { path:'ganancias',   loadChildren: () => import('./ganancias/ganancias.module').then(m => m.GananciasModule) },
      { path:'favoritos',   loadChildren: () => import('./favoritos/favoritos.module').then(m => m.FavoritosModule) },
      { path:'**', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
