import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { InicioHubComponent } from './components/inicio-hub/inicio-hub.component';


const routes: Routes = [
  { path: '', component: InicioComponent , children:
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
export class InicioRoutingModule { }
