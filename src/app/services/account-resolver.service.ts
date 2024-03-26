import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AccountResolver implements Resolve<any> {
  constructor(private accountService: AccountService) {}

  resolve(): Observable<any> {
    return this.accountService.getAccounts();
  }
}
