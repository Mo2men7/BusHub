import { Component,OnInit,ElementRef } from '@angular/core';
import { BusesComponent } from '../buses/buses.component';
import { DestinationsComponent } from '../destinations/destinations.component';
import { Routes } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BusesComponent,DestinationsComponent,SidebarComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  myChart: any;
  myChart1: any;
  myChart2: any;
  myChart3: any;
  myChart4: any;
  constructor(private elementRef: ElementRef) {
   
  }
  ngOnInit(): void {
   
    this.chartit();
  } 
  chartit(){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#acquisitions`);
    let htmlRef1 = this.elementRef.nativeElement.querySelector(`#acquisitions1`);
    let htmlRef2 = this.elementRef.nativeElement.querySelector(`#acquisitions2`);
    let htmlRef3 = this.elementRef.nativeElement.querySelector(`#acquisitions3`);
    // let htmlRef = this.elementRef.nativeElement.querySelector(`#acquisitions`);
    const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    
    fill: false,
    borderColor: '#0587eb',
    backgroundColor:"white",
 
    tension: 0.1
  }]
};
const options =  {
     color:"white",
  scales: {
    x: {  // <-- axis is not array anymore, unlike before in v2.x: '[{'
      border: {
        color: 'white'
      },
      ticks: {
        color: 'white',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.295)',
        borderColor: 'rgba(255, 255, 255, 0.295)'  // <-- this line is answer to initial question
      }
      
    },
    y: {  // <-- axis is not array anymore, unlike before in v2.x: '[{'
      border: {
        color: 'white'
      },
      ticks: {
        color: 'white',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.295)',
        borderColor: 'rgba(255, 255, 255, 0.295)'  // <-- this line is answer to initial question
      }
    }
    
  }
};
    this.myChart = new Chart(htmlRef,  {type: 'line',
    data: data,
    options:options
    
  });
    this.myChart1 = new Chart(htmlRef1,  {type: 'doughnut',
    data: data,
  });
    this.myChart2 = new Chart(htmlRef2,  {type: 'doughnut',
    data: data,
  });
    this.myChart3 = new Chart(htmlRef3,  {type: 'doughnut',
    data: data,
  });
 }
}
