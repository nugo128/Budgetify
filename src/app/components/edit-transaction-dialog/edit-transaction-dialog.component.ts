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
  receivedArray: string[] = [];
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
      category: [data.category],
    });
  }
  uploadedImageUrl: string | null = null;

  onUploadSuccess(event: any): void {
    console.log('File uploaded successfully:', event['addedFiles'][0]);
    const uploadedFile = event['addedFiles'][0];
    console.log(uploadedFile);

    if (uploadedFile instanceof Blob) {
      this.uploadedImageUrl = URL.createObjectURL(uploadedFile);
    } else {
      console.error('Invalid', event);
    }
  }

  onFileRemoved(event: any): void {
    console.log('File removed:', event);

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
      console.log(obj);
    }
    this.editTransactionForm.get('category').setValue(obj);
    console.log(array);
  }
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
