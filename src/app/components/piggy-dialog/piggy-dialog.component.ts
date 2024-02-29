import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IPiggy } from '../../models/piggy';
import { EditPiggyDialogComponent } from '../edit-piggy-dialog/edit-piggy-dialog.component';
import { AddMoneyToPiggyDialogComponent } from '../add-money-to-piggy-dialog/add-money-to-piggy-dialog.component';
import { DeletePiggyDialogComponent } from '../delete-piggy-dialog/delete-piggy-dialog.component';

@Component({
  selector: 'app-piggy-dialog',
  templateUrl: './piggy-dialog.component.html',
  styleUrl: './piggy-dialog.component.css',
})
export class PiggyDialogComponent implements OnDestroy {
  delete: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PiggyDialogComponent>
  ) {}

  openEditPiggyDialog(data: IPiggy) {
    const dialogRef = this.dialog.open(EditPiggyDialogComponent, {
      data: data,
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      position: {
        top: '0px',
        right: '0px',
      },
      height: '100%',
      width: '603px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data = result;
      }
    });
  }
  ngOnDestroy(): void {
    if (!this.delete) {
      this.dialogRef.close(this.data);
    }
  }
  openAddMoneyToPiggyDialog(data: IPiggy) {
    const dialogRef = this.dialog.open(AddMoneyToPiggyDialogComponent, {
      data: data,
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      position: {
        top: '0px',
        right: '0px',
      },
      height: '100%',
      width: '603px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data = result;
      }
    });
  }
  closeDialogWithData(type: any): void {
    this.dialogRef.close(type);
  }
  openDeleteDialog(data: number) {
    const dialogRef = this.dialog.open(DeletePiggyDialogComponent, {
      data: data,
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      height: '25%',
      width: '603px',
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.closeDialogWithData({ delete: data.id });
        this.delete = true;
      }
    });
  }
}
