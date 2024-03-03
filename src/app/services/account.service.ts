import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccounts() {
    return this.http.get(`${BASE_API_URL}/account`);
  }
  editAccount(formData) {
    return this.http.post(`${BASE_API_URL}/editAccount`, formData);
  }
}
