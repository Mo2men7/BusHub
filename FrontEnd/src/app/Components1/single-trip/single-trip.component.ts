import { Component, input } from '@angular/core';
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
import { PaymentComponent } from '../../payment/payment.component';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

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
    PaymentComponent,
  ],
  templateUrl: './single-trip.component.html',
  styleUrl: './single-trip.component.css',
})
export class SingleTripComponent {
  //constractor
  constructor(
    private activatedRoute: ActivatedRoute,
    private TripsshowService: TripsshowService, //api tripsshow
    private SeatsService: SeatsService, // api seats
    private matIconRegistry: MatIconRegistry,

    private domSanitizer: DomSanitizer, //icons
    private UserService: UserService, //user service
    private  cookie:CookieService,

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
  allseats: any; //api seats
  seats: any;
  selected: any[] = [];
  tripId: any; //from url
  typeId: any; //from url
  totalPrice: any = 0;
  userDetails:any;
  ngOnInit(): void {
    this.tripId = this.activatedRoute.snapshot.params['id']; //from url
    this.typeId = this.activatedRoute.snapshot.params['typeid']; //from url
    console.log(this.tripId); //delete
    console.log(this.typeId);
    this.showtrips(); //run api tripsshow
    this.seatsshow(); //run api seats
    const token=this.cookie.get('token');
    this.UserService.userProfile(token).subscribe(res=>{this.userDetails=res;
      console.log('user details',this.userDetails);
    }) //user service
    // console.log('user details',this.userDetails);
    
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
      next: (allseats: any) => {
        this.allseats = allseats;
        console.log(allseats); //delete
        this.seats = this.allseats.filter(
          (seat: any) => seat.trip_id == this.tripId
        );
        console.log(this.seats); //delete
      },
    });
  }
  //run api tripsshow end

  reserve(seat: any) {
    const seatId = document.getElementById(seat.id);

    console.log(seat);

    if (this.selected.some((s) => s.id === seat.id)) {
      console.log('Seat already selected');
      this.selected = this.selected.filter((s) => s.id !== seat.id);
      seatId?.classList.toggle('seat-blue');
    } else {
      this.selected.push(seat);
      seatId?.classList.toggle('seat-blue');
    }

    console.log(this.selected); //delete
  }
  calculateTotalPrice() {
    this.totalPrice = this.selected.reduce(
      (total) => total + this.details?.price,
      0
    );
    console.log(this.totalPrice);
  }

  btn1 = document.getElementById('submitButton');
}
