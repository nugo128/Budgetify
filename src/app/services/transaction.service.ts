import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../global';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getTransactions() {
    return this.http.get(`${BASE_API_URL}/transactions`);
  }
  updateTransaction(formData) {
    return this.http.post(`${BASE_API_URL}/updateTransactions`, formData);
  }
  deleteTransaction(id: number) {
    return this.http.delete(`${BASE_API_URL}/deleteTransaction/${id}`);
  }
  search(formData: any) {
    return this.http.post(`${BASE_API_URL}/searchTransaction`, formData);
  }
}
