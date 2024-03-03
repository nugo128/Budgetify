import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent {
  @Input() title = '';
  @Input() amount = 0;
  @Input() category = '';
  @Input() date = '';
}
