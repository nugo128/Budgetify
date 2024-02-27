import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-piggy-dialog',
  templateUrl: './piggy-dialog.component.html',
  styleUrl: './piggy-dialog.component.css',
})
export class PiggyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PiggyDialogComponent>
  ) {}
}
