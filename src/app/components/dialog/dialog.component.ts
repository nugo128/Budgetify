import { Component, Inject, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditTransactionDialogComponent } from '../edit-transaction-dialog/edit-transaction-dialog.component';
import { DeleteTransactionDialogComponent } from '../delete-transaction-dialog/delete-transaction-dialog.component';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public router: Router,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(EditTransactionDialogComponent, {
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
      this.router.navigate([`transaction/${data.id}`]);
    });
  }
  closeDialogWithData(type: string): void {
    this.dialogRef.close(type);
  }
  openDeleteDialog(data: number) {
    const dialogRef = this.dialog.open(DeleteTransactionDialogComponent, {
      data: data,
      panelClass: 'custom-dialog-container',
      height: '20%',
      width: '603px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result),
        tap((result) => {
          this.data = result;
          this.closeDialogWithData('delete');
        })
      )
      .subscribe();
  }
}
