import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { TripsService } from '../services/trips.service';
import { CookieService } from 'ngx-cookie-service';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-nexttrips',
  standalone: true,
  imports: [MatTabsModule,RouterLink,],
  templateUrl: './nexttrips.component.html',
  styleUrl: './nexttrips.component.css'
})
export class NexttripsComponent {
  loading:boolean=true
  constructor(private userservice: UserService, private activatedRoute: ActivatedRoute,private nexttrips:TripsService,private cookie:CookieService) { }
  userId: any;
  userData: any;
  nextTrips: any;
  token = this.cookie.get("token");
  isarray: any;
  result: any;
  ngOnInit(): void {

    // this.userId = this.activatedRoute.snapshot.params["id"];
    // console.log(this.userId);

    // this.userservice.userProfile(this.userId).subscribe(
    //   res => {
    //     this.userData = res;
    //     console.log(this.userData);
    //   }
    // );

    this.nexttrips.userNextTrips(this.token).subscribe(
      res => {
        this.nextTrips = res;
        // console.log(this.nextTrips);
        this.loading=false
        // this.isarray = this.isArrayEmpty(this.nextTrips);
        // console.log(this.isarray)

      }, error => {
        this.loading=true
      }
    )
  }

  // isArrayEmpty(arr: any[]): boolean {
  //   return arr.length === 0;
  // }

}
