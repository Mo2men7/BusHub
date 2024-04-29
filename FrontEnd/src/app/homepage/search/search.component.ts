import { Component } from '@angular/core';
import { DestinationService } from '../../services/destination.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  ngOnInit() {
    this.destinationService
      .getDestinations()
      .subscribe((res: any) => (this.destinations = res));
  }
  tomorrow:any=new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().substring(0, 10);
  formData: any = { travelDate: this.tomorrow, passengers: 1 }; // Object to hold form data
  onSubmit() {
      const { origin, destination, travelDate, passengers } = this.formData;
      this.router.navigate([
        '/trips',
        origin,
        destination,
        travelDate,
        passengers,
      ]);
  }
  
}
