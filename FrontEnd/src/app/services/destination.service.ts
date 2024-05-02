import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  constructor(private http: HttpClient) { }

  getDestinations() {

    return this.http.get('http://127.0.0.1:8000/api/destinations');
  }
}
