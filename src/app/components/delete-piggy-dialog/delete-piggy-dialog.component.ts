import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-delete-piggy-dialog',
  templateUrl: './delete-piggy-dialog.component.html',
  styleUrl: './delete-piggy-dialog.component.css',
})
export class DeletePiggyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public dialogRef: MatDialogRef<DeletePiggyDialogComponent>,
    public transactionService: TransactionService
  ) {}
}
