import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TripService {
  url: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }
  listTrips() {
    return this.http.get(this.url+'/api/admin/trips');
  }

}
