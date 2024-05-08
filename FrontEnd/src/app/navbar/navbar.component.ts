import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private userservice: UserService,
    private cookie: CookieService,
    private http: HttpClient
  ) {}
  userData: any;
  token = this.cookie.get("token");
  ngOnInit() {
    if (this.token) {
      this.userservice.userProfile(this.token).subscribe(
        res => {
          this.userData = res;
        }
      )
    }
  }
}
