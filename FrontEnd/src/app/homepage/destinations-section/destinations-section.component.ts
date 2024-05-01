import { Component } from '@angular/core';
// import { DestinationService } from '../../services/destination.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-destinations-section',
  standalone: true,
  imports: [],
  templateUrl: './destinations-section.component.html',
  styleUrl: './destinations-section.component.css'
})
export class DestinationsSectionComponent {
  destinations: any;
  constructor (   private cookie:CookieService){}
  ngOnInit() {
    let token = this.cookie.get("token");
    console.log(token);

    // this.destinationService.getDestinations(token).subscribe((res:any)=>this.destinations=res);
  }
}
