import { Component } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { StatisticsComponent } from '../../components/statistics/statistics.component';
import { Card } from '../../models/cards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CardsComponent, CommonModule, StatisticsComponent],
})
export class HomeComponent {
  public isPlayersTurn = false;
  public isInitialDeal = true;
  public isGameOver = false;
  public dealersHand: string[] = [];
  public playersHand: string[] = [];
  public trueCount = 0;
  private readonly aceLowValue = 1;
  private readonly hardTotalDecisions: Record<number, string[]> = {
    8: ['h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h', 'h'],
    9: ['h', 'd', 'd', 'd', 'd', 'h', 'h', 'h', 'h', 'h'],
    10: ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'h', 'h'],
    11: ['d', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'],
    12: ['h', 'h', 's', 's', 's', 'h', 'h', 'h', 'h', 'h'],
    13: ['s', 's', 's', 's', 's', 'h', 'h', 'h', 'h', 'h'],
    14: ['s', 's', 's', 's', 's', 'h', 'h', 'h', 'h', 'h'],
    15: ['s', 's', 's', 's', 's', 'h', 'h', 'h', 'h', 'h'],
    16: ['s', 's', 's', 's', 's', 'h', 'h', 'h', 'h', 'h'],
    17: ['s', 's', 's', 's', 's', 'h', 'h', 'h', 'h', 'h'],
  };

  private readonly softTotalDecisions: Record<number, string[]> = {
    13: ['h', 'h', 'h', 'd', 'd', 'h', 'h', 'h', 'h', 'h'],
    14: ['h', 'h', 'h', 'd', 'd', 'h', 'h', 'h', 'h', 'h'],
    15: ['h', 'h', 'd', 'd', 'd', 'h', 'h', 'h', 'h', 'h'],
    16: ['h', 'h', 'd', 'd', 'd', 'h', 'h', 'h', 'h', 'h'],
    17: ['h', 'd', 'd', 'd', 'd', 'h', 'h', 'h', 'h', 'h'],
    18: ['s', 's', 's', 's', 's', 's', 's', 'h', 'h', 'h'],
    19: ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
    20: ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's'],
  };

  public onCardRemoved() {
    if (this.isPlayersTurn) {
      this.isPlayersTurn = true;
    }
  }

  public onCardAdded(card: Card) {
    if (this.isGameOver) {
      return;
    }
    if (this.isPlayersTurn) {
      this.playersHand.push(card.title);
    } else {
      this.dealersHand.push(card.title);
    }

    if (this.isInitialDeal) {
      this.isInitialDeal = false;
      this.isPlayersTurn = true;
    }

    if (!this.isPlayersTurn && this.getDealersHandValue() < 17) {
      this.endGame();
    }

    if (this.isPlayersTurn && this.getPlayersHandValue() > 21) {
      this.isPlayersTurn = false;
      this.endGame();
    }
  }

  public changeTurns() {
    this.isPlayersTurn = !this.isPlayersTurn;
  }

  public onReset() {
    this.isPlayersTurn = false;
    this.isInitialDeal = true;
    this.isGameOver = false;
    this.dealersHand = [];
    this.playersHand = [];
  }

  public endGame() {
    this.isGameOver = true;
  }

  public getDealersHandValue() {
    return this.getHandTotal(this.dealersHand);
  }

  public getPlayersHandValue() {
    return this.getHandTotal(this.playersHand);
  }

  private getHandTotal(hand: string[]) {
    const orderedHand = hand
      .map((card) => this.getCardValue(card))
      .sort((a, b) => a - b);
    const total = orderedHand.reduce((total, cardValue) => {
      if (cardValue === 11 && total + cardValue > 21) {
        return total + this.aceLowValue;
      }
      return total + cardValue;
    }, 0);
    if (total > 21) {
      this.isGameOver = true;
    }
    return total;
  }

  public getCardValue(cardValue: string, useAceLow: boolean = false): number {
    if (!cardValue) return 0;
    switch (cardValue) {
      case 'A':
        return 11;
      case 'K':
      case 'Q':
      case 'J':
        return 10;
      default:
        return parseInt(cardValue);
    }
  }

  public gameResult() {
    const dealersHandValue = this.getDealersHandValue();
    const playersHandValue = this.getPlayersHandValue();

    if (playersHandValue > 21) {
      return 'You Bust! Dealer wins!';
    }

    if (dealersHandValue > 21) {
      return 'Dealer Busts! You win!';
    }

    if (playersHandValue > dealersHandValue) {
      return 'You win!';
    }

    if (dealersHandValue > playersHandValue) {
      return 'Dealer wins!';
    }

    return 'Push!';
  }

  public basicStrategyDecision() {
    const dealersUpCard = this.getCardValue(this.dealersHand[0]);
    const playersHandValue = this.getPlayersHandValue();
    const isSoft =
      this.playersHand.includes('A') && this.playersHand.length === 2;
    const isPair = this.playersHand[0] === this.playersHand[1];
    if (playersHandValue >= 17) {
      return 's';
    }
    if (isSoft) {
      return this.softTotalDecisions[playersHandValue][dealersUpCard - 2];
    } else {
      return this.hardTotalDecisions[playersHandValue][dealersUpCard - 2];
    }
  }

  public showDecision() {
    if (this.playersHand.length < 2) {
      return 'TBD';
    }
    const basicDecision = this.basicStrategyDecision();
    switch (basicDecision) {
      case 'h':
        return 'Hit';
      case 's':
        return 'Stand';
      case 'd':
        return 'Double';
      default:
        return 'Split';
    }
  }
}
