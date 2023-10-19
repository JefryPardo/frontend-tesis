import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/publico/components/home/home.component';
import { LoginComponent } from './components/publico/components/auth/login/login.component';
import { RegisterComponent } from './components/publico/components/auth/register/register.component';
import { ProductoComponent } from './components/utils/producto/producto.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'producto', component: ProductoComponent },
  // { path: 'flipping', component: FlippingComponent },
  // { path: 'search_flipping', component: SearchFlippingComponent },
  // { path: 'inventory', component: InventoryComponent },
  // { path: 'calculator', component: CalculatorComponent },
  // { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
