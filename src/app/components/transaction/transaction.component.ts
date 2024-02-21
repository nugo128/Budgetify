import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() category = '';
  @Input() date = '';
  @Input() author = '';
  @Input() transactionType = '';
  @Input() amount = '';
}
