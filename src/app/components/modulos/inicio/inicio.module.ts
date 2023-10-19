import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio.component';
import { CartaModule } from '../../utils/carta/carta.module';
import { SearchModule } from '../../utils/search/search.module';
import { BannerModule } from '../../utils/banner/banner.module';
import { NavbarMovilModule } from '../../utils/navbar-movil/navbar-movil.module';


@NgModule({
declarations: [
    InicioComponent
],

imports: [
    CartaModule,
    SearchModule,
    BannerModule,
    NavbarMovilModule
],

exports: [InicioComponent],
  
providers: [],
bootstrap: []
})
export class InicioModule { }