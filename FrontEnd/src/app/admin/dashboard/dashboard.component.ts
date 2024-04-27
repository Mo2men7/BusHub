import { Component } from '@angular/core';
import { BusesComponent } from '../buses/buses.component';
import { DestinationsComponent } from '../destinations/destinations.component';
import { Routes } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BusesComponent,DestinationsComponent,SidebarComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
