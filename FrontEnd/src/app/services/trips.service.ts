import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  // constructor() { }
  url:string ="http://localhost:8000"
  constructor(private http: HttpClient) { }
  listtrips(){
    return this.http.get<any>(this.url+`/api/tripsjoin`)
  }
}
