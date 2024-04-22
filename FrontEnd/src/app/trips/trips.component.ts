import { Component } from '@angular/core';
import { TripsService } from '../services/trips.service';
@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent {
  constructor(private TripsService: TripsService) {}
  trips:any;
  ngOnInit(): void {
    this.showArticles()
  }
    showArticles() {
      this.TripsService.listtrips().subscribe({
        next: (trips: any) => {
          this.trips = trips;
          console.log(trips);
        },
        error: (err) => {
          console.error("Error fetching articles:", err);
        }
      });
    }
}


