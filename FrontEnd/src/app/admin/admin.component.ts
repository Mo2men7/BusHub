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
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  loading:boolean=true
  constructor(
    private destinationService: DestinationService,
    private cookie: CookieService,
    private router: Router
  ) {}
  token:any = this.cookie.get("token");

  ngOnInit() {
    this.destinationService.listDestinations(this.token).subscribe(
      (res: any) => 
        {
          console.log(res);
          this.loading = false
        },
      (error) =>  {
        this.router.navigate(["/signin"])
        this.loading = true

      }

    );
  }
}
