import { Component } from '@angular/core';
import { TripsshowService } from '../../services1/tripsshow.service';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { CustomDatePipe } from '../../custom-date.pipe';
import { TimeFormatPipe } from '../../time-format.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tripsshow',
  standalone: true,
  imports: [CommonModule,NgClass,RouterLink,NavbarComponent,FooterComponent,CustomDatePipe,TimeFormatPipe],
  templateUrl: './tripsshow.component.html',
  styleUrl: './tripsshow.component.css'
})
export class TripsshowComponent {
  constructor(private TripsshowService: TripsshowService, private activatedRoute:ActivatedRoute) {}
  trips:any;
  formData:any={};
  ngOnInit(): void {
    this.showtrips()
    const {from, to, travelDate, passengers} = this.formData;
    this.formData.from = this.activatedRoute.snapshot.params['from'];
    this.formData.to = this.activatedRoute.snapshot.params['to'];
    this.formData.travelDate = this.activatedRoute.snapshot.params['travelDate'];
    this.formData.passengers = this.activatedRoute.snapshot.params['passengers'];
    console.log(this.formData.from, this.formData.to, this.formData.travelDate, this.formData.passengers)
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
