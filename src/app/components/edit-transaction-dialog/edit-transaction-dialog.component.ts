import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-edit-transaction-dialog',
  templateUrl: './edit-transaction-dialog.component.html',
  styleUrl: './edit-transaction-dialog.component.css',
})
export class EditTransactionDialogComponent implements OnInit {
  editTransactionForm: FormGroup;
  transactionType: string = '';
  receivedArray: string[] = [];
  public images: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<EditTransactionDialogComponent>
  ) {
    this.editTransactionForm = this.fb.group({
      id: [data.id],
      title: [data.title],
      amount: [data.amount],
      author: [data.author],
      date: [data.date],
      description: [data.description],
      transaction_type: [data.transaction_type],
      category: [data.category],
    });
  }
  uploadedImageUrl: string | null = null;

  onUploadSuccess(event: any): void {
    event['addedFiles'].map((item) => {
      this.images.push(URL.createObjectURL(item));
    });
  }

  onFileRemoved(event: any): void {
    this.uploadedImageUrl = null;
  }
  ngOnInit(): void {
    this.transactionType = this.data.transaction_type;
  }
  onCategoryChange(categories: string[]) {
    this.editTransactionForm.get('category').setValue(categories);
  }

  formData: any = {
    transaction_type: '',
  };

  handleArray(array: string[]) {
    this.receivedArray = array;
    let obj = {};
    for (let i = 0; i < array.length; i++) {
      obj[`category${i + 1}`] = array[i];
    }
    this.editTransactionForm.get('category').setValue(obj);
  }
  onSubmit() {
    if (this.editTransactionForm.valid) {
      this.formData = this.editTransactionForm.value;
      this.formData.transaction_type = this.transactionType;
      this.transactionService
        .updateTransaction(this.formData)
        .subscribe((responseData) => {
          this.dialogRef.close(responseData);
        });
    }
  }
  changeType(type: string) {
    this.transactionType = type;
    this.formData.transaction_type = type;
  }
}
