import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DestinationService } from '../services/destination.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-destinations-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './destinations-page.component.html',
  styleUrl: './destinations-page.component.css'
})
export class DestinationsPageComponent {
  constructor(private destinationService:DestinationService,private cookie:CookieService){}
  destinations:any;
  ngOnInit() {
    let token = this.cookie.get("token");

    this.destinationService.getDestinations(token).subscribe(
      (res)=>{this.destinations=res;
        console.log(res);
      }
    )
  }
}
