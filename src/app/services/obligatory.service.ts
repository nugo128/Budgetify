import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';
import { IPiggy } from '../models/piggy';

@Injectable({
  providedIn: 'root',
})
export class ObligatoryService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`${BASE_API_URL}/obligatory`);
  }
}
