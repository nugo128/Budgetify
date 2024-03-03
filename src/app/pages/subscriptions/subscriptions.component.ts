import { Component } from '@angular/core';
import { IAccount } from '../../models/account';
import { AccountDialogComponent } from '../../components/account-dialog/account-dialog.component';
import { AccountService } from '../../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionDialogComponent } from '../../components/subscription-dialog/subscription-dialog.component';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent {
  accounts: IAccount[];
  subscriptions: any;
  constructor(
    public accountService: AccountService,
    public dialog: MatDialog,
    public subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((response) => {
      this.accounts = response['accounts'];
    });
    this.subscriptionService.getSubscriptions().subscribe((response) => {
      this.subscriptions = response['subscriptions'];
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
    dialogRef.afterClosed().subscribe((result) => {
      const index = this.accounts.findIndex(
        (obj: IAccount) => obj.id === result.id
      );
      this.accounts[index] = result;
    });
  }
  openSubscriptionDialog(data) {
    const dialogRef = this.dialog.open(SubscriptionDialogComponent, {
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
