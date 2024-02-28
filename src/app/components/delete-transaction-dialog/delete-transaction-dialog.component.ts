import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-delete-transaction-dialog',
  templateUrl: './delete-transaction-dialog.component.html',
  styleUrl: './delete-transaction-dialog.component.css',
})
export class DeleteTransactionDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public dialogRef: MatDialogRef<DeleteTransactionDialogComponent>,
    public transactionService: TransactionService
  ) {}

  deleteTransaction() {
    this.transactionService
      .deleteTransaction(this.data)
      .subscribe((response) => {
        this.dialogRef.close(this.data);
      });
  }
}
