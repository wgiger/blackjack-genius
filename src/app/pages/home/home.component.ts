import { Component } from '@angular/core';
import { CardsComponent } from "../../components/cards/cards.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CardsComponent]
})
export class HomeComponent {

}
