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
import { AccountService } from '../../services/account.service';
import { AccountDialogComponent } from '../../components/account-dialog/account-dialog.component';
import { IAccount } from '../../models/account';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  public transactions: ITransaction[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public piggyBanks: IPiggy[];
  public accounts: IAccount[];
  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog,
    public router: Router,
    private _snackBar: MatSnackBar,
    public piggyService: PiggyService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((responseData) => {
      this.transactions = responseData['transactions'];
    });
    this.piggyService.getPiggy().subscribe((response) => {
      this.piggyBanks = response['piggy'];
    });
    this.accountService.getAccounts().subscribe((response) => {
      this.accounts = response['accounts'];
      this.accounts[0].active = true;
    });
  }
  openDialog(data: ITransaction) {
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
          (obj: IPiggy) => obj.id === result.delete
        );
        this.accounts[0].balance += Number(this.piggyBanks[index].saved_amount);
        this.piggyBanks.splice(index, 1);
      } else {
        const index = this.piggyBanks.findIndex((obj) => obj.id === result.id);
        this.piggyBanks[index] = result;
      }
    });
  }
  openAccountDialog(data: IAccount) {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      data: data,
      panelClass: 'custom-dialog-container',
      position: {
        top: '0px',
        right: '0px',
      },
      height: '100%',
      width: '603px',
    });
    const index = this.accounts.findIndex(
      (obj: IAccount) => obj.id === data.id
    );
    this.accounts.forEach((item) => {
      item.active = false;
    });
    this.accounts[index].active = true;
    dialogRef.afterClosed().subscribe((result) => {
      const index = this.accounts.findIndex(
        (obj: IAccount) => obj.id === result.id
      );
      this.accounts[index] = result;
    });
  }
}
