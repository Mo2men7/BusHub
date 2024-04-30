import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EdituserdetailsComponent } from '../edituserdetails/edituserdetails.component';
import { PrevioustripsComponent } from '../previoustrips/previoustrips.component';
import { CookieService } from 'ngx-cookie-service';
import { NexttripsComponent } from '../nexttrips/nexttrips.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,RouterLinkActive,RouterLink,EdituserdetailsComponent,PrevioustripsComponent,NexttripsComponent,NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private userservice:UserService ,private activatedRoute:ActivatedRoute,private cookie:CookieService) { }
  userId: any;
  userData: any;
  token = this.cookie.get("token");

  ngOnInit(): void {

    // this.userId = this.activatedRoute.snapshot.params["id"];
    console.log(this.token)

    this.userservice.userProfile(this.token).subscribe(
      res => {
        this.userData = res;
        // console.log(this.cookie.get("token"))
        // console.log(this.userData);
      }
    )



  }



}
