import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  url: string = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}
  listDestinations() {
    return this.http.get(this.url+'/api/admin/destinations');
  }
  httpOptions={
    headers :new HttpHeaders({
      'Content-Type':'application/json'
    })
  };
  addDestinations(dest:any) {
    return this.http.post(this.url+'/api/admin/destinations',dest,this.httpOptions);
  }
}