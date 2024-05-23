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
  styleUrl: './destinations-page.component.css',
})
export class DestinationsPageComponent {

  constructor(private destinationService: DestinationService) {}
  destinations: any;
  ngOnInit() {
    this.destinationService.getDestinations().subscribe((res) => {
      this.destinations = res;
      console.log(this.destinations);


    });
  }

  onImageLoad(index:any) {
    console.log('Image Loaded');
    // console.log(index);
    const skeleton=document.getElementById("skeleton"+index)
    skeleton?.remove();
    const img=document.getElementById("img"+index)
    img!.hidden=false ;
  }

  onImageError(index:any) {
    // Handle error case, for now, we can keep the skeleton visible
    console.error('Image failed to load');
    // this.isLoading[index] = true; // You can change this logic based on your needs
  }
}
