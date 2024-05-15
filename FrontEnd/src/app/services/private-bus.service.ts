import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrivateBusService {
  constructor(private http:HttpClient) { }
  getPrivateBusRequests(){
    return this.http.get("http://127.0.0.1:8000/api/private-bus-requests")
  }
  getPrivateBusRequestsFromUser(id:any){
    return this.http.get(`http://127.0.0.1:8000/api/private-bus-requests/${id}`)
  }
}
