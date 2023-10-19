import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal.component';
import { InicioComponent } from './components/inicio/inicio.component';



const routes: Routes = [
  { path: '', component: PrincipalComponent , children:
    [
      { path:'' , redirectTo: 'inicio', pathMatch: 'full' },
      { path:'inicio', component: InicioComponent },
      { path:'**', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
