import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../models/cards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card: Card | undefined;
  @Input() readonly numberOfDecks: number = 8;
  @Output() cardRemoved = new EventEmitter<Card>();
  @Output() cardAdded = new EventEmitter<Card>();

  public removeCard() {
    if (this.card && this.card.numberRemaining > 0) {
      this.card.numberRemaining -= 1;
      this.cardRemoved.emit(this.card);
    }
  }

  public addCard(event: MouseEvent) {
    event?.preventDefault();
    if (this.card && this.card.numberRemaining < this.numberOfDecks) {
      this.card.numberRemaining += 1;
      this.cardRemoved.emit(this.card);
    }
  }
}
