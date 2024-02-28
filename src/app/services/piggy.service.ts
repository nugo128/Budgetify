import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';
import { IPiggy } from '../models/piggy';

@Injectable({
  providedIn: 'root',
})
export class PiggyService {
  constructor(private http: HttpClient) {}

  getPiggy() {
    return this.http.get(`${BASE_API_URL}/piggy`);
  }
  editPiggy(formData: IPiggy) {
    return this.http.post(`${BASE_API_URL}/editPiggy`, formData);
  }
  addMoneyToPiggy(formData: IPiggy) {
    return this.http.post(`${BASE_API_URL}/addMoney`, formData);
  }
  crashPiggy(id: number) {
    return this.http.delete(`${BASE_API_URL}/crashPiggy/${id}`);
  }
}
