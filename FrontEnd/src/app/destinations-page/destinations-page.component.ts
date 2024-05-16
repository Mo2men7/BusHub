import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DestinationService } from '../services/destination.service';
import { CookieService } from 'ngx-cookie-service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-destinations-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './destinations-page.component.html',
  styleUrl: './destinations-page.component.css'
})
export class DestinationsPageComponent {
  constructor(private destinationService:DestinationService){}
  destinations:any;
  ngOnInit() {


    this.destinationService.getDestinations().subscribe(
      (res)=>{this.destinations=res;
        // console.log(res);
      }
    )
  }
}
