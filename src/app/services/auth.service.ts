import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../global';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(formData) {
    return this.http.post(`${BASE_API_URL}/login`, formData);
  }
  register(formData) {
    return this.http.post(`${BASE_API_URL}/signup`, formData);
  }
}
