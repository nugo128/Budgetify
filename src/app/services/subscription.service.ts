import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';
import { IPiggy } from '../models/piggy';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  getSubscriptions() {
    return this.http.get(`${BASE_API_URL}/subscription`);
  }
  editSubscription(formData: any) {
    return this.http.post(`${BASE_API_URL}/editSubscription`, formData);
  }
}
