import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { ToastService } from './service/toast.service';
import { AuthGuard } from './core/components/auth/auth.guard';
import { RolDirective } from './directive/rol.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RolDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    MenubarModule,
    ToastModule,
  ],
  exports: [],
  providers: [MessageService,ToastService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
