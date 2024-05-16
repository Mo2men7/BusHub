import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CustomDatePipe } from '../custom-date.pipe';
import { TimeFormatPipe } from '../time-format.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-userticket',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, CustomDatePipe,LoaderComponent,
    TimeFormatPipe,
    MatProgressSpinnerModule],
  templateUrl: './userticket.component.html',
  styleUrl: './userticket.component.css'
})
export class UserticketComponent {
  token: any=this.cookie.get("token");
  constructor(private cookie: CookieService, private userservice: UserService,private router:Router,private route: ActivatedRoute
  ) {

    // console.log(this.token)

  }


  ticketDetails: any;
  trips: any;
  ngOnInit() {

   const trip_id= this.route.snapshot.params['id']

    this.userservice.showTicket(trip_id,this.token).subscribe(
      res => {

        // console.log(this.token)
        // console.log(res);
        this.ticketDetails = res;
        this.trips = this.ticketDetails?.trips;



      }
    )
  }

}
