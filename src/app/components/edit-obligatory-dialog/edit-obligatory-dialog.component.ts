import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObligatoryService } from '../../services/obligatory.service';
import { IObligatory } from '../../models/obligatory';

@Component({
  selector: 'app-edit-obligatory-dialog',
  templateUrl: './edit-obligatory-dialog.component.html',
  styleUrl: './edit-obligatory-dialog.component.css',
})
export class EditObligatoryDialogComponent {
  receivedArray: string[] = [];
  editObligatoryForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IObligatory,
    public dialogRef: MatDialogRef<EditObligatoryDialogComponent>,
    public obligatoryService: ObligatoryService
  ) {
    this.editObligatoryForm = this.fb.group({
      id: [data.id],
      title: [data.title],
      amount: [data.amount],
      description: [data.description],
      date: [{}],
      date_to: [data.date_to],
      date_from: [data.date_from],
    });
  }

  formData: IObligatory;

  onSubmit() {
    if (this.editObligatoryForm.valid) {
      this.formData = this.editObligatoryForm.value;

      if (this.editObligatoryForm.value.date.start) {
        const startDate = new Date(this.editObligatoryForm.value.date.start)
          .toISOString()
          .split('T')[0];
        this.formData.date_from = startDate;
      }
      if (this.editObligatoryForm.value.date.end) {
        const endDate = new Date(this.editObligatoryForm.value.date.end)
          .toISOString()
          .split('T')[0];
        this.formData.date_to = endDate;
      }
      this.obligatoryService
        .editObligatory(this.formData)
        .subscribe((response) => {
          console.log(response);
          this.dialogRef.close(response);
        });
    }
  }
}
