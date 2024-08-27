import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  { path: '', component: CoreComponent , children:
    [
      { path:'' , redirectTo: 'home', pathMatch: 'full' },
      { path:'login', component: LoginComponent },
      { path:'register', component: RegisterComponent },
      { path:'home', component: HomeComponent },
      { path:'**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
