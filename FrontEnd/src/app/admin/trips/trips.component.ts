import { Component } from '@angular/core';
import { TripService } from '../services/tripService/trip.service';
import { BusService } from '../services/busService/bus.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TimeFormatPipe } from '../../time-format.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,TimeFormatPipe,MatIconModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css',
})
export class TripsComponent {
  today =
  new Date()
    .toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' })
    .split('/')[2] +
  '-' +
  new Date()
    .toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' })
    .split('/')[0]
    .padStart(2, '0') +
  '-' +
  new Date()
    .toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' })
    .split('/')[1]
    .padStart(2, '0');

  trips: any;
  buses: any;
  countBuses: any;
  addTripFrom: FormGroup;
  onSuccessAdd: any=0;
  onErrorAdd:any;
  deleteSuc: any = 0;
  idToDel:any;
  constructor(
    private tripService: TripService,
    private busService: BusService,
    private matIconRegistry:MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.addTripFrom = new FormGroup({
      destination: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      bus_id: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'seat-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/img/seat-icon.svg'
      )
    );
    // this.onSuccessAdd=0;
    this.addTripFrom = new FormGroup({
      destination: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      bus_id: new FormControl('', [Validators.required]),
    });
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
        this.countBuses = res.length;
      },
      (error) => console.log(error)
    );
  console.log(this.today)
  }

  addTrip(from: any) {
    let suc: any=0;
    
    const formData = new FormData();
    formData.append('bus_id', this.addTripFrom.controls['bus_id'].value);
    formData.append('from', from);
    formData.append('to', this.addTripFrom.controls['destination'].value);
    formData.append('price', this.addTripFrom.controls['price'].value);
    formData.append('date', this.addTripFrom.controls['date'].value);
    formData.append('time', this.addTripFrom.controls['time'].value);
    console.log(this.addTripFrom.controls['time'].value);
    console.log(this.addTripFrom);
    console.log(formData);
    this.tripService.addTrips(formData).subscribe(
      (res) => {
        this.onSuccessAdd=1;
        this.ngOnInit();
        console.log(res);
        // suc=1;
      },
      (error) => {console.log(error)
      
        this.onSuccessAdd=-1;
      }
    );
  }
  initForAddSuc()
  {
    this.onSuccessAdd=0;
  }
  setInitValueDel(id:any)
  {
    this.deleteSuc = 0;
    this.idToDel=id;
  }
  deleteTrip() {
    this.deleteSuc = 0;
   console.log(this.idToDel)
    this.tripService.deleteTrip(this.idToDel).subscribe(
      (res: any) => {
        this.deleteSuc = 1;
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.deleteSuc = -1;
      }
    );
  }
}

// expand(id: any) {
//   for (var i = 0; i < this.trips.length; i++) {
//     const id2 = 'Exp' + this.trips[i].id;
//     const div = document.getElementById(id2);
//     div?.classList.remove('order-0');
//     div?.classList.remove('order-' + (i + 1));
//     if (id2 == id) continue;
//     div?.classList.add('order-' + (i + 1));
//     div?.classList.add('cardCollapse');
//     div?.classList.remove('cardExpand');
//   }
//   const div2 = document.getElementById(id);
//   if (div2?.classList.contains('cardExpand')) {
//     div2?.classList.remove('cardExpand');
//     div2?.classList.add('cardCollapse');
//   } else {
//     div2?.classList.add('cardExpand');
//     div2?.classList.add('order-0');
//     div2?.classList.remove('cardCollapse');
//   }
// }
