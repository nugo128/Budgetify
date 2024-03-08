import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  get(data) {
    return this.http.post(`${BASE_API_URL}/statistics`, data);
  }
}
