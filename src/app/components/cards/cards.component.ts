import { Component, EventEmitter, Output } from '@angular/core';
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
  'J',
  'Q',
  'K',
  'A',
];

@Component({
  selector: 'app-cards',
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  imports: [CardComponent, CommonModule],
})
export class CardsComponent {
  @Output() cardRemoved = new EventEmitter<Card>();
  public cards: Card[] = [];
  public readonly numberOfDecks = 8;
  public totalCards = this.cards.length;
  constructor() {
    for (let value of CARD_VALUES) {
      this.cards.push({
        id: this.cards.length,
        title: `${value}`,
        imageUrl: `assets/cards/${value.toLocaleLowerCase()}_of_hearts.svg`,
        numberRemaining: this.numberOfDecks * 4,
      });
    }

    this.totalCards = this.cards.length;
  }

  get totalCardsRemaining() {
    return this.cards.length;
  }

  onCardRemoved(card: Card) {
    this.cardRemoved.emit(card);
  }
}
