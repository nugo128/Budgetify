import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() cardType = '';
  @Input() amount = '';
  @Input() currency = '';
  @Input() selected = '';
}
