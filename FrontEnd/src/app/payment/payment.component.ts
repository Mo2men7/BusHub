import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { SafePipe } from '../admin/pipes/safe.pipe';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  integration_id: any = 4564810;
  request1: any = {
    api_key:
      'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1Rjek5qWTJMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuY2dWVTNiUkpVekhpbE1EekEtRTZmWGhPeGN5aTRYOUdpT08zYlR1Z0gtOXRISS1uYVZKdTB3TzVZTWVLUGQ0dWVYY2U2Z1BOblpsT0pkVm5TVE1fbGc=',
  };
  request2: any = {
    auth_token: '',
    delivery_needed: 'false',
    amount_cents: '100',
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
    amount_cents: '100',
    expiration: 3600,
    order_id: '',
    billing_data: {
      apartment: '7',
      email: 'amira@exa.com',
      floor: '42',
      first_name: 'Amira',
      street: 'Ethan Land',
      building: '8028',
      phone_number: '+86(8)9135210487',
      shipping_method: 'PKG',
      postal_code: '01898',
      city: 'Jaskolskiburgh',
      country: 'CR',
      last_name: 'Nicolas',
      state: 'Utah',
    },
    currency: 'EGP',
    integration_id: this.integration_id,
  };
  iframe: any;
  constructor(
    private paymentService: PaymentService,
    private finaldata: HttpClient
  ) {}

  ngOnInit() {
    this.paymentService.getToken(this.request1).subscribe(
      (res1: any) => {
        this.request2.auth_token = res1.token;
        this.request3.auth_token = res1.token;
        this.paymentService.getOrder(this.request2).subscribe(
          (res2: any) => {
            this.request3.order_id = res2.id;
            this.paymentService.getAcceptance(this.request3).subscribe(
              (res3: any) => {
                this.iframe =
                  'https://accept.paymob.com/api/acceptance/iframes/841613?payment_token=' +
                  res3.token;
                console.log(this.iframe);
              },
              (error) => console.log(error)
            );
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
