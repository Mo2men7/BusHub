import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DestinationsComponent } from './admin/destinations/destinations.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { BusesComponent } from './admin/buses/buses.component';
import { TripsshowComponent } from './Components1/tripsshow/tripsshow.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DestinationsComponent,SidebarComponent,BusesComponent,TripsshowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
