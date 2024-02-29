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
import { PiggyService } from '../../services/piggy.service';
import { IPiggy } from '../../models/piggy';
import { PiggyDialogComponent } from '../../components/piggy-dialog/piggy-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  public transactions: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public piggyBanks: any;
  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog,
    public router: Router,
    private _snackBar: MatSnackBar,
    public piggyService: PiggyService
  ) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((responseData) => {
      this.transactions = responseData['transactions'];
    });
    this.piggyService.getPiggy().subscribe((response) => {
      this.piggyBanks = response['piggy'];
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
        this.transactions = responseData['transactions'];
      });
      this.router.navigate(['/']);
      if (result === 'delete') {
        this._snackBar.open('Transaction was successfully removed', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }
  openPiggyDialog(data: IPiggy) {
    const dialogRef = this.dialog.open(PiggyDialogComponent, {
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
      if (result['delete']) {
        const index = this.piggyBanks.findIndex(
          (obj) => obj.id === result.delete
        );
        this.piggyBanks.splice(index, 1);
      } else {
        const index = this.piggyBanks.findIndex((obj) => obj.id === result.id);
        this.piggyBanks[index] = result;
      }
    });
  }
}
