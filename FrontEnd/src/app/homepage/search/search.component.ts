import { Component } from '@angular/core';
import { DestinationService } from '../../services/destination.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  destinations: any;

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    ) {
  }
  today = new Date().toISOString().split('T')[0];
  ngOnInit() {
    this.destinationService
      .getDestinations()
      .subscribe((res: any) => (this.destinations = res));
      //locked previous days
      console.log(this.today)
      document.getElementsByName('travelDate')[0].setAttribute('min', this.today);
  }
  // tomorrow:any=new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().substring(0, 10);
  formData: any = { travelDate: this.today, passengers: 1 }; // Object to hold form data
  onSubmit() {
      // const { origin, destination, travelDate, passengers } = this.formData;
      const { origin, destination, travelDate } = this.formData;
      this.router.navigate([
        '/trips',
        origin,
        destination,
        travelDate,
        // passengers,
      ]);
  }

}
