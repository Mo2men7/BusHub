import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripsService } from '../services/trips.service';
import { NgModel } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edituserdetails',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,RouterLinkActive,RouterLink],
  templateUrl: './edituserdetails.component.html',
  styleUrl: './edituserdetails.component.css'
})
export class EdituserdetailsComponent {
  constructor(private userservice:UserService ,private activatedRoute:ActivatedRoute,private router: Router,private cookie:CookieService) { }
  userId: any;
  userData: any;
  username: any;
  email: any;
  phone: any;
  city: any;
  token = this.cookie.get("token");

  userDetails:any = {
    phone: ``,
    email: "",
    username: "",
    city:"",
   };
  ngOnInit(): void {

    // this.userId = this.activatedRoute.snapshot.params["id"];
    // console.log(this.userId)

    this.userservice.userProfile(this.token).subscribe(
      res => {
        this.userData = res;
        // console.log(this.userData);
        this.email = this.userData.email
        this.username = this.userData.username
        this.phone = this.userData.phone
        this.city=this.userData.city

        this.userDetails = {
          phone: `${this.phone}`,
          email: `${this.email}`,
          username: `${this.username}`,
          city: `${this.city}`,

         };
      }
    )


  }

  incomeData: any;
  edit() {
    const formDataJson: any = JSON.stringify(this.userDetails);
    console.log(this.userDetails);
    this.userservice.editUserDetails( this.userDetails,this.token).subscribe(
      (res?) =>{
        console.log(res );

      this.incomeData = res;
    // const userid = this.incomeData["user"].id;

    window.location.reload();

    //  this.router.navigate(['/profile']);
    //  this.userDetails = {
    //   phone: "",
    //   email: "",
    //   username: ""
    //  };
  },
      error => {
        console.error('Error sending data:', error);
      }
    )
  }
}
