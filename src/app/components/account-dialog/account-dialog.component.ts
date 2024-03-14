import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditAccountDialogComponent } from '../edit-account-dialog/edit-account-dialog.component';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrl: './account-dialog.component.css',
})
export class AccountDialogComponent implements OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    public dialog: MatDialog
  ) {}
  getCurrencyDisplay(value: string): string {
    switch (value) {
      case '€':
        return 'EUR(€)';
      case '$':
        return 'USD($)';
      default:
        return 'Unknown Currency';
    }
  }
  ngOnDestroy(): void {
    this.dialogRef.close(this.data);
  }
  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      data: data,
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
}
