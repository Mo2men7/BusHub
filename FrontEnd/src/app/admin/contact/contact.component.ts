import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private http:HttpClient, private router:Router){}
  ContactUsData:any;
  ngOnInit(){
    this.http.get('http://127.0.0.1:8000/api/contactus').subscribe(res=>{
      console.log(res);
      this.ContactUsData=res;
    })
  }
  navigateToSingleContact(id:any){
    this.router.navigate([`/single-contact-us/${id}`])
  }
}
