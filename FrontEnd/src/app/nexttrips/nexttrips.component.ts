import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { TripsService } from '../services/trips.service';
import { CookieService } from 'ngx-cookie-service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-nexttrips',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nexttrips.component.html',
  styleUrl: './nexttrips.component.css'
})
export class NexttripsComponent {
  constructor(private userservice: UserService, private activatedRoute: ActivatedRoute,private nexttrips:TripsService,private cookie:CookieService) { }
  userId: any;
  userData: any;
  nextTrips: any;
  token = this.cookie.get("token");
  isarray: any;
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
        console.log(this.nextTrips);
        // this.isarray = this.isArrayEmpty(this.nextTrips);
        // console.log(this.isarray)

      }
    )
  }

  // isArrayEmpty(arr: any[]): boolean {
  //   return arr.length === 0;
  // }

}
