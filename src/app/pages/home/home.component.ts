import { Component } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { StatisticsComponent } from '../../components/statistics/statistics.component';
import { Card } from '../../models/cards';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CardsComponent, StatisticsComponent],
})
export class HomeComponent {
  public isPlayersTurn = false;
  public isInitialDeal = true;
  public dealersHand: string[] = [];
  public playersHand: string[] = [];

  public onCardRemoved() {
    if (this.isPlayersTurn) {
      this.isPlayersTurn = true;
    }
  }

  public onCardAdded(card: Card) {
    if (this.isPlayersTurn) {
      this.playersHand.push(card.title);
    } else {
      this.dealersHand.push(card.title);
    }

    if (this.isInitialDeal) {
        this.isInitialDeal = false;
        this.isPlayersTurn = true;
      }
  }

  public changeTurns() {
    this.isPlayersTurn = !this.isPlayersTurn;
  }
}
