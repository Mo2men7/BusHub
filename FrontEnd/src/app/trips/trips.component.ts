import { Component } from '@angular/core';
import { TripsService } from '../services/trips.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule,NgClass],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent {
  constructor(private TripsService: TripsService) {}
  trips:any;
  ngOnInit(): void {
    this.showtrips()
  }
    showtrips() {
      this.TripsService.listtrips().subscribe({
        next: (trips: any) => {
          this.trips = trips;
          console.log(trips); //delete
          this.filterTrips()
        },

      });
    }
    filterTrips() {
    this.trips = this.trips.filter((trip: any) => trip.from_location == '2' 
    && trip.to_location == '1'
    && trip.date.toLowerCase() == "2024-04-25");
    console.log(this.trips) //delete
  }



}


