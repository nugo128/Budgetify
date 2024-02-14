import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public user: IUser;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUser().subscribe((responseData: IUser) => {
      console.log(responseData);
      this.user = responseData;
    });
  }
}
