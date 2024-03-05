import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditTransactionDialogComponent } from '../edit-transaction-dialog/edit-transaction-dialog.component';
import { EditSubscriptionComponent } from '../edit-subscription/edit-subscription.component';
import { ISubscription } from '../../models/subscription';

@Component({
  selector: 'app-subscription-dialog',
  templateUrl: './subscription-dialog.component.html',
  styleUrl: './subscription-dialog.component.css',
})
export class SubscriptionDialogComponent implements OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ISubscription,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SubscriptionDialogComponent>
  ) {}
  ngOnDestroy(): void {
    this.dialogRef.close(this.data);
  }
  openEditDialog(data: ISubscription) {
    const dialogRef = this.dialog.open(EditSubscriptionComponent, {
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
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US').replace(/\//g, '.');
  }
}
