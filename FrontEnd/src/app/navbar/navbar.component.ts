import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

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
    private http: HttpClient,
    private router:Router,
  ) {}
  userData: any;
  notifications: any;
  token = this.cookie.get("token");
  ngOnInit() {
    if (this.token) {
      this.userservice.userProfile(this.token).subscribe(
        res => {
          // console.log("userData: ", res);
          this.userData = res;
        }
      )
    }
    let  httpOptions =new HttpHeaders().set("Authorization","Bearer "+this.token);
    this.http
      .get(`http://127.0.0.1:8000/api/userNotifications`, {headers:httpOptions})
      .subscribe((res: any) => {
        // console.log(res);
        this.notifications = res;
      });
  }
  getNotificationTitle(dataString: string): string {
    const dataObject = JSON.parse(dataString);
    return dataObject.title || 'No title available';
  }
  logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userservice.logout(this.token).subscribe(res => {
          // console.log(res);
          this.cookie.delete("token");
          // this.router.navigate(["/"])
          window.location.reload();
        })
      }
    });
  }
  notifiationsOpened: boolean = false;
  markAllNotificationsAsRead(id:any) {
    if (!this.notifiationsOpened) {
      this.notifiationsOpened = !this.notifiationsOpened;
      this.http
        .put(`http://127.0.0.1:8000/api/notifications/mark-all-read/${id}`, {})
        .subscribe(
          () => {
            // console.log('All notifications marked as read');
          },
          (error) => {
            console.error('Error marking notifications as read:', error);
          }
        );
    }
    this.http
      .get('http://127.0.0.1:8000/api/userNotifications')
      .subscribe((res: any) => {
        // console.log(res);
        this.notifications = res;
      });
  }
}
