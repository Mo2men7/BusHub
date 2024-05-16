import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeatsService {
  url: string = 'http://localhost:8000';
  constructor(private http: HttpClient) {}
  listseats() {
    return this.http.get<any>(this.url + `/api/seats`);
  }
  // find(id: number): Observable<any> {
  //   return this.http.get(this.url + `/api/seat/` + id);
  // }
  update(userId: any,selectedSeats: any[]): Observable<any> {
    const updateRequests = selectedSeats.map(seat => {
      const id = seat.id; 
      // console.log('service id',id);
      
      return this.http.put(`${this.url}/api/seat/${id}`, { 
        reserved: userId ,
        trip_id:seat.trip_id,
        seat_num:seat.seat_num
      });
    });

    // Combine all requests into a single Observable
    return forkJoin(updateRequests);
  }
  
}
