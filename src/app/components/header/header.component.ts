import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/user';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public user: IUser;
  public currentUrl: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const currentRoute = this.route;

    const childRoutes = currentRoute.children;

    childRoutes.forEach((childRoute) => {
      childRoute.url.forEach((a) => (this.currentUrl = a[0]?.path));
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.route;
        const childRoutes = currentRoute.children;
        childRoutes.forEach((childRoute) => {
          childRoute.url.forEach((a) => (this.currentUrl = a[0]?.path));
        });
      });
    this.userService.getUser().subscribe((responseData: IUser) => {
      console.log(responseData);
      this.user = responseData;
    });
  }
}
