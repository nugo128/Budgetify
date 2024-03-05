import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscriptionService } from '../../services/subscription.service';
import { ISubscription } from '../../models/subscription';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrl: './edit-subscription.component.css',
})
export class EditSubscriptionComponent {
  receivedArray: string[] = [];
  editSubscriptionForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ISubscription,
    public dialogRef: MatDialogRef<EditSubscriptionComponent>,
    public subscriptionService: SubscriptionService
  ) {
    this.editSubscriptionForm = this.fb.group({
      id: [data.id],
      title: [data.title],
      amount: [data.amount],
      description: [data.description],
      category: [data.category],
      date: [{}],
      date_to: [data.date_to],
      date_from: [data.date_from],
    });
  }

  onCategoryChange(categories: string[]) {
    this.editSubscriptionForm.get('category').setValue(categories);
  }

  formData: any = {};

  handleArray(array: string[]) {
    this.receivedArray = array;
    let obj = {};
    for (let i = 0; i < array.length; i++) {
      obj[`category${i + 1}`] = array[i];
    }
    this.editSubscriptionForm.get('category').setValue(obj);
  }
  onSubmit() {
    if (this.editSubscriptionForm.valid) {
      this.formData = this.editSubscriptionForm.value;

      console.log(this.editSubscriptionForm.value.date.start);

      if (this.editSubscriptionForm.value.dat) {
        const startDate = new Date(this.editSubscriptionForm.value.date.start)
          .toISOString()
          .split('T')[0];
        this.formData.date_from = startDate;
      }
      if (this.editSubscriptionForm.value.date.end) {
        const endDate = new Date(this.editSubscriptionForm.value.date.end)
          .toISOString()
          .split('T')[0];
        this.formData.date_to = endDate;
      }
      this.subscriptionService
        .editSubscription(this.formData)
        .subscribe((response) => {
          this.dialogRef.close(response);
        });
    }
  }
}
