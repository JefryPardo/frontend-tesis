import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { CommonModule } from '@angular/common';


@NgModule({
declarations: [
    SearchComponent
],

imports: [
    CommonModule
],

exports: [SearchComponent],
  
providers: [],
bootstrap: []
})
export class SearchModule { }