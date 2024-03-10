import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountDialogComponent } from '../../components/account-dialog/account-dialog.component';
import { IAccount } from '../../models/account';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatisticService } from '../../services/statistic.service';
import * as echarts from 'echarts';

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
  dataSource: any;
  chartDom;
  myChart;
  option = {
    grid: {
      left: '0%',
      right: '65%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: [],
      name: 'Category',
      nameLocation: 'end',
      nameGap: 10,
      axisLabel: { show: false },
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [8, 8],
        symbolOffset: [5, 5],
        show: true,
        lineStyle: {
          color: 'black',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: '$   ',
      nameGap: 10,
      splitLine: {
        show: false,
      },
      axisLine: {
        symbol: ['none', 'arrow'],
        symbolSize: [8, 8],
        symbolOffset: [5, 5],
        show: true,
        lineStyle: {
          color: 'black',
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      nameTextStyle: {
        align: 'right',
      },
    },
    series: [],
  };
  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public statisticService: StatisticService
  ) {
    this.statistic = this.fb.group({
      date_from: '1/3/2023',
      date_to: '3/3/2024',
    });
  }
  accounts: any;
  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((response) => {
      this.accounts = response['accounts'];
      this.accounts[0].active = true;
    });
    this.chartDom = document.getElementById('chart');
    this.myChart = echarts.init(this.chartDom);

    this.statisticService.get(this.statistic.value).subscribe((response) => {
      this.statisticData = response;
      const groupedMap = new Map<string, any>();

      this.statisticData.forEach((transaction) => {
        const hasTransactionType = 'transaction_type' in transaction;

        if (
          (hasTransactionType && transaction.transaction_type === 'Expenses') ||
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
      this.groupedTransactions.forEach((element) => {
        this.amount += element.totalAmount;
        this.option.series.push({
          data: [{ value: element.totalAmount, name: element.category }],
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            color: this.getRandomColor(),
          },
          label: {
            show: true,
            rotate: '90',
            formatter: function (params) {
              return params.data.name;
            },
            position: 'top',
            distance: '20',
          },
        });
      });
      this.dataSource = this.groupedTransactions;
      this.myChart.setOption(this.option);
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
  getRandomColor(): string {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

    return color;
  }
  formData: any;
  dateChanged(start: string, end: string): void {
    this.formData = this.statistic.value;
    this.formData.date_from = start;
    this.formData.date_to = end;
    if (this.formData.date_from && this.formData.date_to) {
      this.statisticService.get(this.formData).subscribe((response) => {
        this.option.series = [];
        this.option.xAxis.data = [];
        this.myChart.clear();
        this.amount = 0;
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
        this.groupedTransactions.forEach((element) => {
          this.amount += element.totalAmount;
          this.option.series.push({
            data: [{ value: element.totalAmount, name: element.category }],
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              color: this.getRandomColor(),
            },
            label: {
              show: true,
              rotate: '90',
              formatter: function (params) {
                return params.data.name;
              },
              position: 'top',
              distance: '20',
            },
          });
        });
        this.dataSource = this.groupedTransactions;
        this.myChart.setOption(this.option);
      });
    }
  }
}
