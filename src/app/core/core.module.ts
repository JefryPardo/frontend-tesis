import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CoreComponent } from './core.component';

import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './components/auth/service/auth.service';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CoreComponent
  ],

  exports: [
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],

  imports: [
    CommonModule,
    
    SharedModule,
    
    CoreRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    CardModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    InputTextModule
  ],

  providers: [AuthService]
})

export class CoreModule { }
