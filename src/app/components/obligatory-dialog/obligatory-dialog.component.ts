import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-obligatory-dialog',
  templateUrl: './obligatory-dialog.component.html',
  styleUrl: './obligatory-dialog.component.css',
})
export class ObligatoryDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ObligatoryDialogComponent>
  ) {}

  formatDate(dateString: any): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US').replace(/\//g, '.');
  }
}
