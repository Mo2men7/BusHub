import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BusService {
  url: string = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}
  listBuses() {
    return this.http.get(this.url + '/api/admin/buses');
  }
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }),
  // };
  // addDestinations(dest: any) {
  //   return this.http.post(
  //     this.url + '/api/destinations',
  //     dest,
  //     this.httpOptions
  //   );
  // }
}
