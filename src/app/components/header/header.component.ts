import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public user;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .subscribe((responseData) => {
        console.log(responseData);
        this.user = responseData;
      });
  }
}
