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
  notifications: any;
  token = this.cookie.get("token");
  ngOnInit() {
    if (this.token) {
      this.userservice.userProfile(this.token).subscribe(
        res => {
          this.userData = res;
        }
      )
    }
    let  httpOptions =new HttpHeaders().set("Authorization","Bearer "+this.token);
    this.http
      .get(`http://127.0.0.1:8000/api/userNotifications`, {headers:httpOptions})
      .subscribe((res: any) => {
        console.log(res);
        this.notifications = res;
      });
  }
  getNotificationTitle(dataString: string): string {
    const dataObject = JSON.parse(dataString);
    return dataObject.title || 'No title available';
  }
}
