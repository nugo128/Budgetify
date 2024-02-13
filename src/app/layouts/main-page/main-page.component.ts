import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  public transactions;
  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getUser().subscribe((responseData) => {
      console.log(responseData['transactions']);
      this.transactions = responseData['transactions'];
    });
  }
}
