import { Component } from '@angular/core';
import { Card } from '../../models/cards';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

export const CARD_GROUPS = ['clubs', 'diamonds', 'hearts', 'spades'];
export const CARD_VALUES = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king',
  'ace',
];

@Component({
  selector: 'app-cards',
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  imports: [CardComponent, CommonModule],
})
export class CardsComponent {
  public cards: Card[] = [];
  private readonly numberOfDecks = 8;
  public totalCards = this.cards.length;
  constructor() {
    for (let group of CARD_GROUPS) {
      for (let value of CARD_VALUES) {
        this.cards.push({
          id: this.cards.length,
          title: `${value} of ${group}`,
          imageUrl: `assets/cards/${value}_of_${group}.svg`,
          numberRemaining: this.numberOfDecks,
        });
      }
    }
    this.totalCards = this.cards.length;
  }

  get totalCardsRemaining() {
    return this.cards.length;
  }

  onCardRemoved(card: Card) {

  }
}
