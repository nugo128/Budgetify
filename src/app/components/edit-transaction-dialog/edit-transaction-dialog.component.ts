import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-transaction-dialog',
  templateUrl: './edit-transaction-dialog.component.html',
  styleUrl: './edit-transaction-dialog.component.css',
})
export class EditTransactionDialogComponent implements OnInit {
  editTransactionForm: FormGroup;
  transactionType: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editTransactionForm = this.fb.group({
      title: [data.title],
      amount: [data.amount],
      author: [data.author],
      date: [data.date],
      description: [data.description],
      transaction_type: [data.transaction_type],
    });
  }
  ngOnInit(): void {
    this.transactionType = this.data.transaction_type;
  }
  formData: any = {
    transaction_type: '',
  };
  onSubmit() {
    if (this.editTransactionForm.valid) {
      this.formData = this.editTransactionForm.value;
      this.formData.transaction_type = this.transactionType;
      console.log(this.formData);
    }
  }
  changeType(type: string) {
    this.transactionType = type;
    console.log(this.transactionType);
    this.formData.transaction_type = type;
  }
}
