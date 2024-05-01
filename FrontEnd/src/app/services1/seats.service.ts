import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  url:string ="http://localhost:8000"
  constructor(private http: HttpClient) { }
  listseats(){
    return this.http.get<any>(this.url+`/api/seats`)
  }
}
