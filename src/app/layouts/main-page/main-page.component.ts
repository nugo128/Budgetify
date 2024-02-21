import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { ITransaction } from '../../models/transaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  public transactions: ITransaction;
  constructor(
    private transactionService: TransactionService,
    public dialog: MatDialog,
    public router: Router
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
      this.router.navigate(['/']);
      console.log(`Dialog result: ${result}`);
    });
  }
}
