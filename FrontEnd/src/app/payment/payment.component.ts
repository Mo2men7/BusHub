import { Component, Input } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { SafePipe } from '../admin/pipes/safe.pipe';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SafePipe,MatProgressSpinnerModule,LoaderComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  // receive data
  @Input() totalPrice!: any;
  userDetails: any;

  integration_id: any = 4564810;
  request1: any = {
    api_key:
      'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1Rjek5qWTJMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuY2dWVTNiUkpVekhpbE1EekEtRTZmWGhPeGN5aTRYOUdpT08zYlR1Z0gtOXRISS1uYVZKdTB3TzVZTWVLUGQ0dWVYY2U2Z1BOblpsT0pkVm5TVE1fbGc=',
  };
  request2: any = {
    auth_token: '',
    delivery_needed: 'false',
    amount_cents: '500',
    currency: 'EGP',
    items: [
      {
        name: 'BusHub',
        amount_cents: '4',
        description: 'ticket to and from',
        quantity: '1',
      },
    ],
  };
  request3: any = {
    auth_token: '',
    amount_cents: '', //req
    expiration: 3600,
    order_id: '',
    billing_data: {
      apartment: '7',
      email: 'test@yahoo.com', //req
      floor: '42',
      first_name: 'Amira', //req
      street: 'Ethan Land',
      building: '8028',
      phone_number: '+86(8)9135210487', //req
      shipping_method: 'PKG',
      postal_code: '01898',
      city: 'Jaskolskiburgh',
      country: 'CR',
      last_name: 'Nicolas', //req
      state: 'Utah',
    },
    currency: 'EGP',
    integration_id: this.integration_id,
  };
  iframe: any;
  constructor(
    private paymentService: PaymentService,
    private finaldata: HttpClient,
    private UserService: UserService, //user service
    private cookie: CookieService
  ) {}

  ngOnInit() {
    // console.log(this.totalPrice);
    // console.log(this.request3.amount_cents);

    this.paymentService.getToken(this.request1).subscribe(
      (res1: any) => {
        this.request2.auth_token = res1.token;
        this.request3.auth_token = res1.token;
        this.paymentService.getOrder(this.request2).subscribe(
          (res2: any) => {
            this.request3.order_id = res2.id;
            //payment start
            this.request3.amount_cents = this.totalPrice * 100; //amount
            const token = this.cookie.get('token');
            this.UserService.userProfile(token).subscribe((res) => {
              this.userDetails = res;
              this.request3.email = this.userDetails.email; //email
              // console.log('user details', this.userDetails.email);
              this.paymentService.getAcceptance(this.request3).subscribe(
                (res3: any) => {
                  this.iframe =
                    'https://accept.paymob.com/api/acceptance/iframes/841613?payment_token=' +
                    res3.token;
                  // console.log(this.iframe);
                },
                (error) => console.log(error)
              );
            });
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
    // this.paymentService.showLast().subscribe(
    //   (res:any) => console.log("lol"+res.request),
    //   (error) => console.log("erroe"+error)
    // );
  }
}
