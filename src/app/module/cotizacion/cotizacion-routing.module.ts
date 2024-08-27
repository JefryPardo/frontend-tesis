import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotizacionComponent } from './cotizacion.component';
import { ListaCotizacionesComponent } from './components/lista-cotizaciones/lista-cotizaciones.component';
import { CotizacionHubComponent } from './components/cotizacion-hub/cotizacion-hub.component';



const routes: Routes = [
  { path: '', component: CotizacionComponent , children:
    [
      { path:'' , redirectTo: 'list', pathMatch: 'full' },
      { path:'list',    component: ListaCotizacionesComponent },
      { path:'hub/:id',     component: CotizacionHubComponent },
      { path:'**', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionRoutingModule { }
