import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrl: './edit-account-dialog.component.css',
})
export class EditAccountDialogComponent {
  editAccountForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditAccountDialogComponent>,
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.editAccountForm = this.fb.group({
      id: [data.id],
      title: [data.title],
      currency: [data.currency],
      balance: [data.balance],
      description: [data.description],
    });
  }
  selectedValue: string;
  currencies: any = [
    { value: '€', viewValue: 'EUR(€)' },
    { value: '$', viewValue: 'USD($)' },
  ];
  formData: any = {};
  onSubmit() {
    if (this.editAccountForm.valid) {
      this.formData = this.editAccountForm.value;
      console.log(this.formData);
      this.accountService.editAccount(this.formData).subscribe((response) => {
        this.dialogRef.close(response);
      });
    }
  }
}
