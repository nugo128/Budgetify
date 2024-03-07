import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';
import { IPiggy } from '../models/piggy';
import { IObligatory } from '../models/obligatory';

@Injectable({
  providedIn: 'root',
})
export class ObligatoryService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`${BASE_API_URL}/obligatory`);
  }
  editObligatory(formData: IObligatory) {
    return this.http.post(`${BASE_API_URL}/editObligatory`, formData);
  }
}
