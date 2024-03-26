import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionResolver implements Resolve<any> {
  constructor(private transactionService: TransactionService) {}

  resolve(): Observable<any> {
    return this.transactionService.getTransactions();
  }
}
