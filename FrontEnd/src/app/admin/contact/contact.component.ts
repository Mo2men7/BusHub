import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private http:HttpClient){}
  ContactUsData:any;
  ngOnInit(){
    this.http.get('http://127.0.0.1:8000/api/contactus').subscribe(res=>{
      console.log(res);
      this.ContactUsData=res;
    })
  }
}
