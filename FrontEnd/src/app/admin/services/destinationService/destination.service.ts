import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  url: string = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}
  listDestinations(token:any) {
    let  httpOptions =new HttpHeaders().set("Authorization","Bearer "+token);

    return this.http.get(this.url+'/api/admin/destinations',{headers:httpOptions});
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
