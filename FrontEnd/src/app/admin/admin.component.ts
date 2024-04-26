import { Component } from '@angular/core';
import { BusesComponent } from './buses/buses.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,BusesComponent,DestinationsComponent,SidebarComponent,DashboardComponent,OrdersComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {

}
