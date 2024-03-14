import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditObligatoryDialogComponent } from '../edit-obligatory-dialog/edit-obligatory-dialog.component';
import { IObligatory } from '../../models/obligatory';

@Component({
  selector: 'app-obligatory-dialog',
  templateUrl: './obligatory-dialog.component.html',
  styleUrl: './obligatory-dialog.component.css',
})
export class ObligatoryDialogComponent implements OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IObligatory,
    public dialogRef: MatDialogRef<ObligatoryDialogComponent>,
    public dialog: MatDialog
  ) {}

  formatDate(dateString: any): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US').replace(/\//g, '.');
  }
  ngOnDestroy(): void {
    this.dialogRef.close(this.data);
  }
  openEditObligatoryDialog(data: IObligatory) {
    const dialogRef = this.dialog.open(EditObligatoryDialogComponent, {
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
}
