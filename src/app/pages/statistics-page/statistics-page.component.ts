import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { IAccount } from '../../models/account';
import { AccountDialogComponent } from '../../components/account-dialog/account-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.css',
})
export class StatisticsPageComponent implements OnInit {
  accounts: any;
  constructor(
    public accountService: AccountService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((response) => {
      this.accounts = response['accounts'];
      this.accounts[0].active = true;
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
