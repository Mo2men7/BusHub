import { Component } from '@angular/core';
import { DestinationsComponent } from '../destinations/destinations.component';
import { BusesComponent } from '../buses/buses.component';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DestinationsComponent,BusesComponent,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
