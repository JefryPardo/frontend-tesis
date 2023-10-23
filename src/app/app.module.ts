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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
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
