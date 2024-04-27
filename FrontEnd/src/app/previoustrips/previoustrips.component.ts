import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripsService } from '../services/trips.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-previoustrips',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,RouterLinkActive,RouterLink],
  templateUrl: './previoustrips.component.html',
  styleUrl: './previoustrips.component.css'
})
export class PrevioustripsComponent {
  constructor(private userservice: UserService, private activatedRoute: ActivatedRoute,private prtrips:TripsService,private cookie:CookieService) { }
  userId: any;
  userData: any;
  previousTrips: any;
  token = this.cookie.get("token");
  ngOnInit(): void {

    // this.userId = this.activatedRoute.snapshot.params["id"];
    // console.log(this.userId);

    // this.userservice.userProfile(this.userId).subscribe(
    //   res => {
    //     this.userData = res;
    //     console.log(this.userData);
    //   }
    // );

    this.prtrips.userPreviousTrips(this.token).subscribe(
      res => {
        this.previousTrips = res;
        console.log(this.previousTrips);
      }
    )
  }
}
