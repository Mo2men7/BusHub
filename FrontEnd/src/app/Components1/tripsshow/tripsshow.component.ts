import { Component } from '@angular/core';
import { TripsshowService } from '../../services1/tripsshow.service';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';


@Component({
  selector: 'app-tripsshow',
  standalone: true,
  imports: [CommonModule,NgClass,RouterLink,NavbarComponent,FooterComponent],
  templateUrl: './tripsshow.component.html',
  styleUrl: './tripsshow.component.css'
})
export class TripsshowComponent {
  constructor(private TripsshowService: TripsshowService) {}
  trips:any;
  ngOnInit(): void {
    this.showtrips()
  }
    showtrips() {
      this.TripsshowService.listtrips().subscribe({
        next: (trips: any) => {
          this.trips = trips;
          console.log(trips); //delete
          this.filterTrips()
        },

      });
    }
    filterTrips() {
    this.trips = this.trips.filter((trip: any) => trip.from == '1' 
    && trip.to == '2'
    && trip.date == "2024-04-25");
    console.log(this.trips) //delete
  }

}
