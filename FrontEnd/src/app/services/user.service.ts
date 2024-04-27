import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://127.0.0.1:8000';
  // private dataSubject = new BehaviorSubject<object>({});
  // private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>("data");
  // public data$: Observable<any> = this.dataSubject.asObservable();
  private isFirstDataSent = false;

  constructor(private http: HttpClient) { }
  httpOptions={
    headers :new HttpHeaders({
      'Content-Type': 'application/json'

    })
  };


  sendData(formDataJson: any) {
    // console.log(formDataJson);
    // Replace 'http://your-api-url' with your actual API URL
    return this.http.post('http://127.0.0.1:8000/api/register',formDataJson,this.httpOptions);
  }

  login(formDataJson: any) {
    // console.log(formDataJson);
    // Replace 'http://your-api-url' with your actual API URL
    return this.http.post('http://127.0.0.1:8000/api/login',formDataJson,this.httpOptions);
  }

  private dataSubject = new BehaviorSubject<object>({});

  sendUserData(data: {}): void {

      this.dataSubject.next(data); // Emit the data if it's the first time

  }
  getData() {
    return this.dataSubject.asObservable();
  }

  userProfile(token:any) {
    let  httpOptions =new HttpHeaders().set("Authorization","Bearer "+token);

    return this.http.get('http://127.0.0.1:8000/api/profile', {headers: httpOptions });

  }

  editUserDetails( userData: any,token:any) {

    // let  httpOptions =new HttpHeaders().set("Authorization","Bearer "+token);


  //  const httpOptions={
  //     headers :new HttpHeaders({
  //       // 'Content-Type': 'application/json',
  //       "Authorization": "Bearer " + token
  //     })
    //   };
    let  httpOptions =new HttpHeaders().set("Authorization","Bearer "+token);


    return this.http.put("http://127.0.0.1:8000/api/edit",userData,{headers:httpOptions}  );
  }

}



