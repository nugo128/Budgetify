import { Component, OnInit } from '@angular/core';
import { ISubscription } from '../../models/subscription';
import { AccountService } from '../../services/account.service';
import { AccountDialogComponent } from '../../components/account-dialog/account-dialog.component';
import { IAccount } from '../../models/account';
import { MatDialog } from '@angular/material/dialog';
import { ObligatoryService } from '../../services/obligatory.service';
import { ObligatoryDialogComponent } from '../../components/obligatory-dialog/obligatory-dialog.component';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrl: './obligatory.component.css',
})
export class ObligatoryComponent implements OnInit {
  subscriptions: ISubscription[];
  accounts: any;
  obligatories: any;
  constructor(
    public accountService: AccountService,
    public obligatoryService: ObligatoryService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((response) => {
      this.accounts = response['accounts'];
      this.accounts[0].active = true;
    });
    this.obligatoryService.get().subscribe((response) => {
      console.log(response);
      this.obligatories = response['obligatory'];
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
  openObligatoryDialog(data: any) {
    const dialogRef = this.dialog.open(ObligatoryDialogComponent, {
      data: data,
      panelClass: 'custom-dialog-container',
      position: {
        top: '0px',
        right: '0px',
      },
      height: '100%',
      width: '603px',
    });
  }
}
