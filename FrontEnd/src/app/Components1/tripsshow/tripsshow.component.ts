import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
//service
import { TripsshowService } from '../../services1/tripsshow.service';
import { DestinationService } from '../../services/destination.service';

//component
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
// import { SearchComponent } from '../../homepage/search/search.component';
//pipe
import { CustomDatePipe } from '../../custom-date.pipe';
import { TimeFormatPipe } from '../../time-format.pipe';
//route
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-tripsshow',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    RouterLink,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    // SearchComponent,
    CustomDatePipe,
    TimeFormatPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tripsshow.component.html',
  styleUrl: './tripsshow.component.css',
})
export class TripsshowComponent {
  constructor(
    private TripsshowService: TripsshowService,
    private DestinationService: DestinationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cookie: CookieService
  ) {}
  //variables
  trips: any;
  formData: any = {};
  destination: any;
  urlfrom: any;
  urlto: any;
  token = this.cookie.get('token');
  ngOnInit(): void {
    this.urlparams();
    //git api tripsshow
    this.showtrips();
    //send data to url "book-trip"
    const { from, to, travelDate } = this.formData;
    this.formData.from = this.activatedRoute.snapshot.params['from'];
    this.formData.to = this.activatedRoute.snapshot.params['to'];
    this.formData.travelDate =
      this.activatedRoute.snapshot.params['travelDate'];
    // console.log(this.formData.from, this.formData.to, this.formData.travelDate); //delete
  }
  showtrips() {
    this.TripsshowService.listtrips().subscribe({
      next: (trips: any) => {
        this.trips = trips;
        // console.log(trips); //delete
        this.filterTrips();
      },
    });
  }

  //   urlparams() {
  //     this.DestinationService.getDestinations().subscribe({
  //       next: (destination: any) => {
  //         this.destination = destination;
  //         console.log(destination); //delete
  //         // this.trips = this.trips.filter(
  // // this.urlfrom=this.destination.filter()=>destination.id==this.formData.from;
  // // this.urlfrom = this.destination.find(dest => dest.id === this.formData.from);
  //       },
  //     });
  //   }

  urlparams() {
    this.DestinationService.getDestinations().subscribe({
      next: (destination: any) => {
        this.destination = destination;
        // console.log(destination); //delete

        // Filter destinations to find the one with the ID matching formData.from
        this.urlfrom = this.destination.find(
          (dest: any) => dest.id == this.formData.from
        );
        this.urlto = this.destination.find(
          (dest: any) => dest.id == this.formData.to
        );
        // console.log('from url', this.urlfrom); // For debugging
        // console.log('to url', this.urlto); // For debugging
      },
    });
  }

  //get current time
  getCurrentTime(): string {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  //get current date
  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  //filter trip of days and destinations selected
  filterTrips() {
    const currentTime = this.getCurrentTime();
    const currentDate = this.getCurrentDate();
    this.trips = this.trips.filter(
      (trip: any) =>
        trip.from == this.formData.from &&
        trip.to == this.formData.to &&
        trip.date == this.formData.travelDate &&
        (this.formData.travelDate != currentDate || trip.time >= currentTime)
    );
    // console.log(this.trips); //delete
  }

  booknow(trip: any) {
    if (this.token) {
      //convert trip time to seconds start
      const triptime = trip.time;
      const timeComponents2 = triptime.split(':').map(Number);
      const hours2 = timeComponents2[0];
      const minutes2 = timeComponents2[1];
      const seconds2 = timeComponents2[2];
      const trip_time = hours2 * 3600 + minutes2 * 60 + seconds2;
      // console.log('trip_time', trip_time);
      //convert trip time to seconds end
      //convert current time to seconds start
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      const timeComponents = formattedTime.split(':').map(Number);
      const hours1 = timeComponents[0];
      const minutes1 = timeComponents[1];
      const seconds1 = timeComponents[2];
      const current_time = hours1 * 3600 + minutes1 * 60 + seconds1;
      // console.log('current_time', current_time);
      //convert current time to seconds end
      //current date start
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      // console.log('date', formattedDate);
      //current date end

      //

      if (trip.date == formattedDate && trip_time - current_time <= 3600) {
        // console.log('2nd if');
        Swal.fire({
          icon: 'warning',
          title: `You can't reserve in this trip as the bus  will take off in less than one hour.`,
          showConfirmButton: true,
          // timer: 2000,
        });
      } else {
        this.router.navigate(['/book-trip', trip.id, trip.type_id]);
      }
    } else {
      Swal.fire({
        title: "You have to be logged in",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log in!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/signin']);
        }
      });

    }
  }
}
