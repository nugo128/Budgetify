import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountDialogComponent } from '../../components/account-dialog/account-dialog.component';
import { IAccount } from '../../models/account';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatisticService } from '../../services/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent {
  statistic: FormGroup;
  statisticData: any;
  groupedTransactions: any;
  amount: any = 0;
  displayedColumns: string[] = ['Category', 'Amount', '% in total'];
  dataSoutce: any;
  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public statisticService: StatisticService
  ) {
    this.statistic = this.fb.group({
      date_from: '',
      date_to: '',
    });
  }
  accounts: any;
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
  formData: any;
  dateChanged(start: string, end: string): void {
    this.formData = this.statistic.value;
    this.formData.date_from = start;
    this.formData.date_to = end;
    if (this.formData.date_from && this.formData.date_to) {
      console.log(this.formData);
      this.statisticService.get(this.formData).subscribe((response) => {
        console.log(response);
        this.statisticData = response;
        const groupedMap = new Map<string, any>();

        this.statisticData.forEach((transaction) => {
          const hasTransactionType = 'transaction_type' in transaction;

          if (
            (hasTransactionType &&
              transaction.transaction_type === 'Expenses') ||
            !hasTransactionType
          ) {
            const categoryObject = JSON.parse(transaction.category);
            const categoryKeys = Object.keys(categoryObject);
            const category =
              categoryKeys.length > 0
                ? categoryObject[categoryKeys[0]]
                : 'Uncategorized';

            if (!groupedMap.has(category)) {
              groupedMap.set(category, {
                category,
                totalAmount: transaction.amount,
                transactions: [transaction],
              });
            } else {
              const group = groupedMap.get(category);
              group.totalAmount += transaction.amount;
              group.transactions.push(transaction);
            }
          }
        });
        this.groupedTransactions = Array.from(groupedMap.values());
        console.log(this.groupedTransactions);
        this.groupedTransactions.forEach((element) => {
          this.amount += element.totalAmount;
        });
        this.dataSoutce = this.groupedTransactions;
      });
    }
  }
}
