import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  constructor(private http: HttpClient) { }

  getDestinations(token:any) {
    let  httpOptions =new HttpHeaders().set("Authorization","Bearer "+token);

    return this.http.get('http://127.0.0.1:8000/api/destinations',{headers: httpOptions });
  }
}
