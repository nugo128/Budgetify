import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PiggyService } from '../../services/piggy.service';
import { IPiggy } from '../../models/piggy';

@Component({
  selector: 'app-edit-piggy-dialog',
  templateUrl: './edit-piggy-dialog.component.html',
  styleUrl: './edit-piggy-dialog.component.css',
})
export class EditPiggyDialogComponent {
  editPiggyForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPiggy,
    private fb: FormBuilder,
    private piggyService: PiggyService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditPiggyDialogComponent>
  ) {
    this.editPiggyForm = this.fb.group({
      id: [data.id],
      goal: [data.goal],
      goal_amount: [data.goal_amount],
    });
  }
  formData: IPiggy;
  onSubmit() {
    if (this.editPiggyForm.valid) {
      this.formData = this.editPiggyForm.value;

      this.piggyService.editPiggy(this.formData).subscribe((response) => {
        this.dialogRef.close(response);
      });
    }
  }
}
