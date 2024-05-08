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
import { FooterComponent } from '../footer/footer.component';
import { MatTabsModule } from '@angular/material/tabs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,RouterLinkActive,RouterLink,EdituserdetailsComponent,PrevioustripsComponent,NexttripsComponent,NavbarComponent,FooterComponent,MatTabsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  loading:boolean=true;
  constructor(private userservice: UserService, private router: Router, private activatedRoute: ActivatedRoute, private cookie: CookieService) {

    if(!this.token) {
      this.router.navigate(["/signin"]);
    }
  }
  userId: any;
  userData: any;
  token = this.cookie.get("token");

  ngOnInit(): void {


    // this.userId = this.activatedRoute.snapshot.params["id"];
    console.log(this.token)

    this.userservice.userProfile(this.token).subscribe(
      res => {
        this.loading=false
        this.userData = res;
        // console.log(this.cookie.get("token"))
        // console.log(this.userData);
      },error => {
        this.loading=true

      }
    )



  }

  logout() {

    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userservice.logout(this.token).subscribe(res => {
          console.log(res);
          this.cookie.delete("token");
          this.router.navigate(["/"])
        })



      }
    });


  }



}
