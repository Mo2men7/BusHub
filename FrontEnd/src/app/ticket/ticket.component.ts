import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//service start
import { CookieService } from 'ngx-cookie-service'; //cookie
import { UserService } from '../services/user.service'; //user service
import { SeatsService } from '../services1/seats.service'; // api seats
import { CustomDatePipe } from '../custom-date.pipe';
import { TimeFormatPipe } from '../time-format.pipe';
//service end
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    CustomDatePipe,
    TimeFormatPipe,
    MatProgressSpinnerModule,
    NavbarComponent,
    FooterComponent,LoaderComponent,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  // variables
  lastResult: any = {
    id: '',
    amount_cents: '',
    order: '',
    created_at: '',
    currency: '',
    updated_at: '',
    source_data_type: '',
    source_data_sub_type: '',
  }; //paymob
  userDetails?: any; //user service
  userId: any;
  selected: any; //session selected key
  tripDeatils: any; //session tripDeatils key
  allseats: any; //api seats
  // seats: any;//api seats
  // constructor
  constructor(
    private route: ActivatedRoute,
    private UserService: UserService, //user service
    private cookie: CookieService, //cookie
    private SeatsService: SeatsService // api seats
  ) {}

  ngOnInit() {
    this.seatsshow(); //run api seats start
    //paymob start
    this.route.queryParamMap.subscribe((params) => {
      this.lastResult.id = params.get('id');
      this.lastResult.amount_cents = params.get('amount_cents');
      this.lastResult.order = params.get('order');
      this.lastResult.created_at = params.get('created_at');
      this.lastResult.currency = params.get('currency');
      this.lastResult.updated_at = params.get('updated_at');
      this.lastResult.source_data_type = params.get('source_data_type');
      this.lastResult.source_data_sub_type = params.get('source_data_sub_type');
    });
    // console.log(this.lastResult);
    //paymob start
    // user service start
    const token = this.cookie.get('token');
    this.UserService.userProfile(token).subscribe((res) => {
      this.userDetails = res;
      this.userId = this.userDetails?.id;
      // console.log('user details', this.userDetails);
      // console.log('user id2', this.userId); //delete
      this.updateSeat(this.userId, this.selected);//update seat function
    });
    // user service end
    //session start
    const storedDataString1 = sessionStorage.getItem('selected');
    if (storedDataString1 !== null) {
      // console.l/og('selected json', storedDataString1); //delete
      this.selected = JSON.parse(storedDataString1);
      // console.log('selected parse', this.selected); //delete
    }
    const storedDataString2 = sessionStorage.getItem('tripDeatils');
    // console.log('tripdetails json', storedDataString2); //delete
    if (storedDataString2 !== null) {
      this.tripDeatils = JSON.parse(storedDataString2);
      // console.log('tripdetails parse', this.tripDeatils); //delete
    }
    //session end
    // console.log('user id1', this.selected.id);
//payment accepted start

Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your payment is confirmed! Thank you for booking with us.",
  showConfirmButton: false,
  timer: 2500
});

//payment accepted end
  }

  //run api seats start
  seatsshow() {
    this.SeatsService.listseats().subscribe({
      next: (allseats: any) => {
        this.allseats = allseats;
        // console.log('seatsshow fn all trip', allseats); //delete
      },
    });
  }
  //run api tripsshow end

  updateSeat(userId: any, selectedSeats: any[]): void {
    // console.log('uu', userId);
    // console.log('uu', selectedSeats);
    this.SeatsService.update(userId, selectedSeats).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
      },
      error: (error) => {
        console.error('Update failed:', error);
      },
    });
  }
}
