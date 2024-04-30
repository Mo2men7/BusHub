import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-trip',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './single-trip.component.html',
  styleUrl: './single-trip.component.css',
})
export class SingleTripComponent {
  tripId: any;
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.tripId = this.activatedRoute.snapshot.params['id'];
    console.log(this.tripId)
  }
}
