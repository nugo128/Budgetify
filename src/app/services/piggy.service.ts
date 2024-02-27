import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BASE_API_URL } from '../global';

@Injectable({
  providedIn: 'root',
})
export class PiggyService {
  constructor(private http: HttpClient) {}

  getPiggy() {
    return this.http.get(`${BASE_API_URL}/piggy`);
  }
}
