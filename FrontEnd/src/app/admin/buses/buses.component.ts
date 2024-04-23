import { Component } from '@angular/core';
import { BusService } from '../services/busService/bus.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.css'
})
export class BusesComponent {
  buses: any;
  newBus:any;
  constructor(private busService: BusService) {}
  ngOnInit() {
    this.busService.listBuses().subscribe(
      (res: any) => (this.buses = res),
      (error) => console.log(error)
    );
  }

}
