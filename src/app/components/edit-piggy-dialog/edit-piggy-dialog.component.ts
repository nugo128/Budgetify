import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-piggy-dialog',
  templateUrl: './edit-piggy-dialog.component.html',
  styleUrl: './edit-piggy-dialog.component.css',
})
export class EditPiggyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditPiggyDialogComponent>
  ) {}
}
