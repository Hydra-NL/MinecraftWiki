import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'ClientSide-Project';
  card = { title: '', description: '' };
  card2 = { title: '', description: '' };
  card3 = { title: '', description: '' };
  card4 = { title: '', description: '' };
  cards = [this.card, this.card2, this.card3, this.card4];

  constructor() {
    console.log('HomeComponent constructor');
  }

  ngOnInit() {
    this.card = {
      title: 'Card 1',
      description: 'This is the content of card 1',
    };
    this.card2 = {
      title: 'Card 2',
      description: 'This is the content of card 2',
    };
    this.card3 = {
      title: 'Card 3',
      description: 'This is the content of card 3',
    };
    this.card4 = {
      title: 'Card 4',
      description: 'This is the content of card 4',
    };
    this.cards = [this.card, this.card2, this.card3, this.card4];
    console.log(this.cards);
  }
}
