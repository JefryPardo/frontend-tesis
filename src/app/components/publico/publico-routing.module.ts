import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicoRoutingModule { }
