import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-money-to-piggy-dialog',
  templateUrl: './add-money-to-piggy-dialog.component.html',
  styleUrl: './add-money-to-piggy-dialog.component.css',
})
export class AddMoneyToPiggyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddMoneyToPiggyDialogComponent>
  ) {}
}
