import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-piggy-bank',
  templateUrl: './piggy-bank.component.html',
  styleUrl: './piggy-bank.component.css',
})
export class PiggyBankComponent {
  @Input() title = '';
  @Input() fullAmount = 0;
  @Input() currentAmount = 0;
}
