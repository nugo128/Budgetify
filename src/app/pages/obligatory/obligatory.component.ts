import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountDialogComponent } from '../../components/account-dialog/account-dialog.component';
import { IAccount } from '../../models/account';
import { MatDialog } from '@angular/material/dialog';
import { ObligatoryService } from '../../services/obligatory.service';
import { ObligatoryDialogComponent } from '../../components/obligatory-dialog/obligatory-dialog.component';
import { IObligatory } from '../../models/obligatory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrl: './obligatory.component.css',
})
export class ObligatoryComponent implements OnInit {
  accounts: IAccount[];
  obligatories: any;
  constructor(
    public accountService: AccountService,
    public obligatoryService: ObligatoryService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.accounts = this.route.snapshot.data['account'].accounts;
    this.accounts[0].active = true;
    this.obligatories = this.route.snapshot.data['obligatory'].obligatory;
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
  openObligatoryDialog(data: IObligatory) {
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
    dialogRef.afterClosed().subscribe((result) => {
      const index = this.obligatories.findIndex(
        (obj: IAccount) => obj.id === result.id
      );
      this.obligatories[index] = result;
    });
  }
}
