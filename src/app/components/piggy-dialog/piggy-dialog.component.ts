import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IPiggy } from '../../models/piggy';
import { EditPiggyDialogComponent } from '../edit-piggy-dialog/edit-piggy-dialog.component';

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

  openEditPiggyDialog(data: IPiggy) {
    console.log(data);
    const dialogRef = this.dialog.open(EditPiggyDialogComponent, {
      data: data,
      panelClass: 'custom-dialog-container',
      position: {
        top: '0px',
        right: '0px',
      },
      height: '100%',
      width: '603px',
    });
  }
}
