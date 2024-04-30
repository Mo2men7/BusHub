import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  url: string = 'https://accept.paymob.com/api';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getToken(request1: any) {
    return this.http.post(
      this.url + '/auth/tokens',
      request1,
      this.httpOptions
    );
  }
  getOrder(request2: any) {
    return this.http.post(
      this.url + '/ecommerce/orders',
      request2,
      this.httpOptions
    );
  }
  getAcceptance(request3: any) {
    return this.http.post(
      this.url + '/acceptance/payment_keys',
      request3,
      this.httpOptions
    );
  }
  showLast() {
  }
  // goToPaymob(token:any)
  // {
  //   return this.http.get(
  //     "https://accept.paymob.com/api/acceptance/iframes/841613?payment_token="+token ,
  //     this.httpOptions
  //   );
  // }
}
