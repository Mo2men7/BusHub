import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-single-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './single-contact-us.component.html',
  styleUrl: './single-contact-us.component.css'
})
export class SingleContactUsComponent {
  constructor(private http:HttpClient){}
  contactUsData:any;
  ngOnInit(){
    this.http.get('http://127.0.0.1:8000/api/contactus/{id}').subscribe(res=>this.contactUsData=res);
  }
}
