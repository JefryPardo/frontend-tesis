import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioHubComponent } from './components/inicio-hub/inicio-hub.component';
import { GananciasComponent } from './ganancias.component';


const routes: Routes = [
  { path: '', component: GananciasComponent , children:
    [
      { path:'' , redirectTo: 'hub', pathMatch: 'full' },
      { path:'hub', component: InicioHubComponent },
      { path:'**', redirectTo: 'hub', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GananciasRoutingModule { }
