import { Component } from '@angular/core';
import { TripService } from '../services/tripService/trip.service';
@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent {
  trips: any;
  constructor(private tripService: TripService) {}
  ngOnInit() {
    this.tripService.listTrips().subscribe(
      (res: any) => {
        console.log(res);
        this.trips = res;
      },
      (error) => console.log(error)
    );
  }
}

