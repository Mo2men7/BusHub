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
      // 'Content-Type':'application/json',
      'Accept':'application/json'
    })
  };
  httpOptions2={
    headers :new HttpHeaders({
      'Content-Type':'application/json',
      // 'Accept':'application/json'
    })
  };
  addDestinations(dest:any) {
    return this.http.post(this.url+'/api/admin/destinations',dest,this.httpOptions);
  }
  deleteDestination(id:any)
  {
    return this.http.delete(this.url+'/api/admin/destination/'+id,this.httpOptions);
  }
  editDestination(updateDes:any,id:any)
  {
    
    // console.log("serve")
    // console.log(updateDes.get("name"))
    return this.http.post(this.url+'/api/admin/destination-update/'+id,updateDes,this.httpOptions);
  }

  countUsers()
  {
    return this.http.get(this.url+'/api/admin/countusers',this.httpOptions);
  }
  countPrivatebus()
  {
    return this.http.get(this.url+'/api/admin/countprivatebus',this.httpOptions);
  }
  countTrips()
  {
    return this.http.get(this.url+'/api/admin/counttrips',this.httpOptions);
  }
  countEarning()
  {
    return this.http.get(this.url+'/api/admin/countearning',this.httpOptions);
  }
}
