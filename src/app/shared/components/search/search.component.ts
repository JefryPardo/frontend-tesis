import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() searchChanged = new EventEmitter<string>();

  onSearchInputChange(event: any) {
    
    const searchTerm = event.target.value;
    this.searchChanged.emit(searchTerm);
  }
}
