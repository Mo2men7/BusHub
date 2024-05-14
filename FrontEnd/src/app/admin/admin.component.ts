import { Component } from '@angular/core';
import { BusesComponent } from './buses/buses.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { DestinationService } from './services/destinationService/destination.service';
import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    BusesComponent,
    DestinationsComponent,
    SidebarComponent,
    DashboardComponent,
    OrdersComponent,
    RouterLink,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  loading: boolean = true;
  constructor(
    private destinationService: DestinationService,
    private cookie: CookieService,
    private router: Router,
    private http: HttpClient
  ) {}

  token: any = this.cookie.get('token');
  notifications: any;

  ngOnInit() {
    this.destinationService.listDestinations(this.token).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
      },
      (error) => {
        this.router.navigate(['/signin']);
        this.loading = true;
      }
    );
    this.http
      .get('http://127.0.0.1:8000/api/adminNotifications')
      .subscribe((res: any) => {
        console.log(res);
        this.notifications = res;
      });
  }
  getNotificationTitle(dataString: string): string {
    const dataObject = JSON.parse(dataString);
    return dataObject.title || 'No title available';
  }
  getNotificationUserName(dataString: string): string {
    const dataObject = JSON.parse(dataString);
    return dataObject.user || 'No title available';
  }
  // getNotificationCreatedAt(dataString:any) {
  //   return (new Date().getHours()) - parseInt((dataString).substring(12,13));
  // }
  notifiationsOpened: boolean = false;
  markAllNotificationsAsRead() {
    if (!this.notifiationsOpened) {
      this.notifiationsOpened = !this.notifiationsOpened;
      this.http
        .put('http://127.0.0.1:8000/api/notifications/mark-all-read', {})
        .subscribe(
          () => {
            console.log('All notifications marked as read');
          },
          (error) => {
            console.error('Error marking notifications as read:', error);
          }
        );
    }
    this.http
      .get('http://127.0.0.1:8000/api/userNotifications')
      .subscribe((res: any) => {
        console.log(res);
        this.notifications = res;
      });
  }
}