import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TripService {
  url: string = 'http://127.0.0.1:8000';
  httpOptions2={
    headers :new HttpHeaders({
      // 'Content-Type':'application/json',
      'Accept':'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  listTrips() {
    return this.http.get(this.url+'/api/admin/trips',this.httpOptions2);
  }
  addTrips(trip:any) {
    return this.http.post(this.url+'/api/admin/trips',trip,this.httpOptions2);
  }
  deleteTrip(id:any)
  {
    return this.http.delete(this.url+'/api/admin/trip/'+id,this.httpOptions2);
  }
  editTrip(updateTrip:any,id:any)
  {
    return this.http.post(this.url+'/api/admin/trip-update/'+id,updateTrip,this.httpOptions2);
  }
}
