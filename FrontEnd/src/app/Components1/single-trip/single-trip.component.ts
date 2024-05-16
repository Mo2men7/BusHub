import { Component, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import Swal from 'sweetalert2'; //sweet alert
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from '../../loader/loader.component';

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
    LoaderComponent,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CustomDatePipe,
    TimeFormatPipe,
    PaymentComponent,
    MatProgressSpinnerModule,

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
    private _Router: Router,
    private domSanitizer: DomSanitizer, //icons
    private UserService: UserService, //user service
    private cookie: CookieService //cookie
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
  userDetails?: any;
  ticket: any[] = [];

  ngOnInit(): void {
    this.tripId = this.activatedRoute.snapshot.params['id']; //from url
    this.typeId = this.activatedRoute.snapshot.params['typeid']; //from url
    // console.log(this.tripId); //delete
    // console.log(this.typeId); //delete
    this.showtrips(); //run api tripsshow
    this.seatsshow(); //run api seats
    // user service start
    const token = this.cookie.get('token');
    this.UserService.userProfile(token).subscribe((res) => {
      this.userDetails = res;
      // console.log('user1 details', this.userDetails);
    });
    // user service end
  }
  //run api tripsshow start
  showtrips() {
    this.TripsshowService.listtrips().subscribe({
      next: (trips: any) => {
        this.trips = trips;
        // console.log('showtrips fn all', trips); //delete
        this.details = this.trips.find((trip: any) => trip.id == this.tripId);
        // console.log('showtrips fn selected', this.details); //delete
      },
    });
  }
  //run api tripsshow end
  //run api seats start
  seatsshow() {
    this.SeatsService.listseats().subscribe({
      next: (allseats: any) => {
        this.allseats = allseats;
        // console.log('seatsshow fn all trip', allseats); //delete
        this.seats = this.allseats.filter(
          (seat: any) => seat.trip_id == this.tripId
        );
        // console.log('seatsshow fn this trip', this.seats); //delete
      },
    });
  }
  //run api tripsshow end

  reserve(seat: any) {
    const seatId = document.getElementById(seat.id);

    // console.log('reserve fn clicked', seat);

    if (this.selected.some((s) => s.id === seat.id)) {
      // console.log('Seat already selected');
      this.selected = this.selected.filter((s) => s.id !== seat.id);
      seatId?.classList.toggle('seat-blue');
    } else {
      this.selected.push(seat);
      seatId?.classList.toggle('seat-blue');
    }
    // console.log('reserve fn array', this.selected); //delete
  }
  calculateTotalPrice() {
    this.totalPrice = this.selected.reduce(
      (total) => total + this.details?.price,
      0
    );
    // console.log('calculateTotalPrice', this.totalPrice);

    //  session start
    sessionStorage.setItem('selected', JSON.stringify(this.selected));
    sessionStorage.setItem('tripDeatils', JSON.stringify(this.details));
    //  session end
  }

  cancle() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel your trip ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancle it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cancled!',
          text: 'Your trip has been cancled.',
          icon: 'success',
        }).then(() => {
          this._Router.navigate(['/']);
        });
      }
    });
  }
}
