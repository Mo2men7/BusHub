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
  
  httpOptions = {
    headers: new HttpHeaders({
      'Accept':'application/json'
    }),
  };
  addBus(bus: any) {
    return this.http.post(
      this.url + '/api/admin/buses',
      bus,
      this.httpOptions
    );
  }
}
