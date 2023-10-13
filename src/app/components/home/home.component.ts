import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  numberOfCards: number = 6;

  getCardRange(): number[] {
    return new Array(this.numberOfCards);
  }
}
