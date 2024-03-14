import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PiggyService } from '../../services/piggy.service';

@Component({
  selector: 'app-add-money-to-piggy-dialog',
  templateUrl: './add-money-to-piggy-dialog.component.html',
  styleUrl: './add-money-to-piggy-dialog.component.css',
})
export class AddMoneyToPiggyDialogComponent {
  AddMoneyToPiggyForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddMoneyToPiggyDialogComponent>,
    private fb: FormBuilder,
    private piggyService: PiggyService
  ) {
    this.AddMoneyToPiggyForm = this.fb.group({
      id: [data.id],
      saved_amount: [data.saved_amount],
      date: [data.date],
    });
  }

  formData: any = {};
  onSubmit() {
    if (this.AddMoneyToPiggyForm.valid) {
      this.formData = this.AddMoneyToPiggyForm.value;
      this.piggyService.addMoneyToPiggy(this.formData).subscribe((response) => {
        this.dialogRef.close(response);
      });
    }
  }
}
