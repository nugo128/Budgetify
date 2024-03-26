import { Component } from '@angular/core';
import { IAccount } from '../../models/account';
import { AccountDialogComponent } from '../../components/account-dialog/account-dialog.component';
import { AccountService } from '../../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionDialogComponent } from '../../components/subscription-dialog/subscription-dialog.component';
import { ISubscription } from '../../models/subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css',
})
export class SubscriptionsComponent {
  accounts: IAccount[];
  subscriptions: ISubscription[];
  constructor(
    public accountService: AccountService,
    public dialog: MatDialog,
    public subscriptionService: SubscriptionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accounts = this.route.snapshot.data['account'].accounts;
    this.accounts[0].active = true;
    this.subscriptions = this.route.snapshot.data['subscription'].subscriptions;
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
  openSubscriptionDialog(data: ISubscription) {
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
    dialogRef.afterClosed().subscribe((result: ISubscription) => {
      const index = this.subscriptions.findIndex(
        (obj: ISubscription) => obj.id === result.id
      );
      this.subscriptions[index] = result;
    });
  }
}
