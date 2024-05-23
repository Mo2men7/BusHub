import { Component } from '@angular/core';
import { BusService } from '../services/busService/bus.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeFormatPipe } from '../../time-format.pipe';
import { NgClass } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [FormsModule, TimeFormatPipe, ReactiveFormsModule, NgClass],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.css',
})
export class BusesComponent {
  buses: any;
  newBusForm: FormGroup;
  newBus: any;
  countBuses: any;
  chosenType: any = 1;
  count: any = 0;
  typeName: any = 'VIP';

  constructor(private busService: BusService) {
    this.newBusForm = new FormGroup({
      chairs: new FormControl('')
    
    });
  }
  ngOnInit() {
    this.busService.listBuses().subscribe(
      (res: any) => {
        this.buses = res;
        // console.log(res);
        this.countBuses = res.length;
      },
      (error) => console.log(error)
    );
    this.newBusForm = new FormGroup({
      chairs: new FormControl('')
    
    });
    const btnNext = document.getElementById('clickItToWork');
    btnNext?.click();
  }

  goToType(id: any) {
    this.chosenType = id;
    for (var i = 1; i <= 5; i++) {
      const btn = document.getElementById('nav' + i);
      btn?.classList.remove('active');
    }
    const btnActive = document.getElementById('nav' + id);
    btnActive?.classList.add('active');
    this.typeName = btnActive?.innerText;
  }
  sendBus() {
    const formData = new FormData();
    formData.append('chairs', this.newBusForm.controls['chairs'].value);
    formData.append('type_id', this.chosenType);
    // console.log(this.newBusForm.controls['chairs'].value)
    this.busService.addBus(formData).subscribe(
      (res: any) => {
        // console.log(res);
        this.ngOnInit();
      },
      (error) => console.log(error)
    );
  }
}
