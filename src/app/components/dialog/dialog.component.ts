import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditTransactionDialogComponent } from '../edit-transaction-dialog/edit-transaction-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public router: Router
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
      this.router.navigate([`transaction/${data.id}`]);
      console.log(`Dialog result: ${result}`);
    });
  }
}
