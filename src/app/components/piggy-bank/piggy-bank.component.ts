import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-piggy-bank',
  templateUrl: './piggy-bank.component.html',
  styleUrl: './piggy-bank.component.css',
})
export class PiggyBankComponent {
  @Input() goal = '';
  @Input() goalAmount = 0;
  @Input() savedAmount = 0;
}
