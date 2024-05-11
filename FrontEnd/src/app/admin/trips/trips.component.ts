import { Component } from '@angular/core';
import { TripService } from '../services/tripService/trip.service';
import { BusService } from '../services/busService/bus.service';
@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent {
  trips: any;
  buses:any;
  countBuses:any;
  constructor(private tripService: TripService,private busService: BusService) {}
  ngOnInit() {
    this.tripService.listTrips().subscribe(
      (res: any) => {
        console.log(res);
        this.trips = res;
      },
      (error) => console.log(error)
    );
    this.busService.listBuses().subscribe(
      (res: any) => {
        this.buses = res;
        // console.log(res.length);
        this.countBuses=res.length;
      },
      (error) => console.log(error)
    );
  }
  expand(id: any) {
    for (var i = 0; i < this.trips.length; i++) {
      const id2 = 'Exp' + this.trips[i].id;
      const div = document.getElementById(id2);
      div?.classList.remove('order-0');
      div?.classList.remove('order-'+(i+1));
      if (id2 == id) continue;
      div?.classList.add('order-'+(i+1));
      div?.classList.add('cardCollapse');
      div?.classList.remove('cardExpand');
    }
    const div2 = document.getElementById(id);
    if (div2?.classList.contains('cardExpand')) {
      div2?.classList.remove('cardExpand');
      div2?.classList.add('cardCollapse');
    } else {
      div2?.classList.add('cardExpand');
      div2?.classList.add('order-0');
      div2?.classList.remove('cardCollapse');
  
    }
  }
}
