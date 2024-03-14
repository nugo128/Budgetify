import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`${BASE_API_URL}/categories`);
  }
  edit(formData: any) {
    return this.http.post(`${BASE_API_URL}/editCategory`, formData);
  }
}
