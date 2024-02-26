import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ITransaction } from '../../models/transaction';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  public transactions: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((responseData) => {
      console.log(responseData['transactions']);
      this.transactions = responseData['transactions'];
    });
  }
  openDialog(data: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
      panelClass: 'custom-dialog-container',
      position: {
        top: '0px',
        right: '0px',
      },
      height: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.transactionService.getTransactions().subscribe((responseData) => {
        console.log(responseData['transactions']);
        this.transactions = responseData['transactions'];
      });
      this.router.navigate(['/']);
      console.log(`Dialog result: ${result}`);
      if (result === 'delete') {
        this._snackBar.open('Transaction was successfully removed', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }
}
