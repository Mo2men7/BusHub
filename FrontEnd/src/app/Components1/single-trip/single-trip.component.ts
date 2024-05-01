import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
//navbar and footer
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
//navbar and footer
//SERVICE
import { TripsshowService } from '../../services1/tripsshow.service';
import { SeatsService } from '../../services1/seats.service';
//SERVICE
//seat icon
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
//seat icon
//ngclass
import { CommonModule } from '@angular/common';
//ngclass
//pipe
import { CustomDatePipe } from '../../custom-date.pipe';
import { TimeFormatPipe } from '../../time-format.pipe';
//pipe
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-single-trip',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    CommonModule,
    NavbarComponent,
    FooterComponent,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CustomDatePipe,
    TimeFormatPipe,
  ],
  templateUrl: './single-trip.component.html',
  styleUrl: './single-trip.component.css',
})
export class SingleTripComponent {
  //constractor
  constructor(
    private activatedRoute: ActivatedRoute,
    private TripsshowService: TripsshowService,   //api tripsshow
    private SeatsService: SeatsService,  // api seats
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer //icons
  ) {
    this.matIconRegistry.addSvgIcon(
      'seat-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/img/seat-icon.svg'
      )
    );
  }
  //variables
  trips: any; //api tripsshow
  details?: any; //api tripsshow
  seats: any; //api seats

  tripId: any; //from url
  isReserved: boolean = false; //test
  isLinear = true; //test
  toggle: boolean = false; //test
  isBlue: boolean = false; //test

  ngOnInit(): void {

    this.tripId = this.activatedRoute.snapshot.params['id'];    //from url
    console.log(this.tripId); //delete

    
    this.showtrips();//run api tripsshow
    this.seatsshow()//run api seats
    
  }
  //run api tripsshow start
  showtrips() {
    this.TripsshowService.listtrips().subscribe({
      next: (trips: any) => {
        this.trips = trips;
        console.log(trips); //delete
        this.details = this.trips.find((trip: any) => trip.id == this.tripId);
        console.log(this.details); //delete
      },
    });
  }
  //run api tripsshow end
  //run api seats start
  seatsshow() {
    this.SeatsService.listseats().subscribe({
      next: (seats: any) => {
        this.seats = seats;
        console.log(seats); //delete
        // this.details = this.seats.find((seat: any) => seat.id == this.tripId);
        console.log(this.seats); //delete
      },
    });
  }
  //run api tripsshow end





  changeColor() {
    this.isReserved = !this.isReserved; // Toggle the value of isRed
  }
  //   reserve(bus:any){

  //     this.isBlue = bus.available;
  //     this.isBlue = !this.isBlue;
  //   this.trips.find((trip:any) => trip.id==bus.id)
  // console.log(this.isBlue)
  //     console.log(bus.id)
  //   }

  // buses: any[] = [
  //   { "id": 1, "available": "true" },
  //   { "id": 2, "available": "false" },
  //   { "id": 3, "available": "true" },
  //   { "id": 4, "available": "true" },
  //   { "id": 5, "available": "false" },
  //   { "id": 6, "available": "true" },
  //   { "id": 7, "available": "false" },
  //   { "id": 8, "available": "true" },
  //   { "id": 9, "available": "true" }

  // ];
}
