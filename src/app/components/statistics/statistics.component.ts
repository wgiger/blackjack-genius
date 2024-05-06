import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  @Input() dealersHand: string[] = [];
  @Input() playersHand: string[] = [];

  public getDealersHandValue() {
    return this.getHandTotal(this.dealersHand, false);
  }

  public getPlayersHardTotal() {
    return this.getHandTotal(this.playersHand, true);

  }

  public getPlayersSoftTotal() {
    return this.getHandTotal(this.playersHand, false);
  }

  private getHandTotal(hand: string[], isHard: boolean) {
    return hand.reduce((total, card) => {
      return total + this.getCardValue(card, isHard);
    }, 0);
  }

  public getCardValue(cardValue: string, isHard: boolean): number {
    if (!cardValue) return 0;
    switch (cardValue) {
      case 'A':
        return isHard ? 1 : 11;
      case 'K':
      case 'Q':
      case 'J':
        return 10;
      default:
        return parseInt(cardValue);
    }
  }
}
