import { Component, OnInit, ElementRef } from '@angular/core';
import { BusesComponent } from '../buses/buses.component';
import { DestinationsComponent } from '../destinations/destinations.component';
import { Routes } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestinationService } from '../services/destinationService/destination.service';
import { LoaderComponent } from '../../loader/loader.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BusesComponent,
    DestinationsComponent,
    SidebarComponent,
    RouterOutlet,
    LoaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  myChart: any;
  countUsers: any;
  countPrivatebus: any;
  countTrips: any;
  countEarning: any;
  constructor(
    private elementRef: ElementRef,
    private count: DestinationService
  ) {}
  ngOnInit(): void {
    this.count.countUsers().subscribe(
      (res) => (this.countUsers = res),
      (error) => console.log(error)
    );
    this.count.countPrivatebus().subscribe(
      (res) => (this.countPrivatebus = res),
      (error) => console.log(error)
    );
    this.count.countTrips().subscribe(
      (res) => (this.countTrips = res),
      (error) => console.log(error)
    );
    this.count.countEarning().subscribe(
      (res) => (this.countEarning = res),
      (error) => console.log(error)
    );
    this.chartit()
  }
  chartit() {
  console.log("loaded")
    let htmlRef = this.elementRef.nativeElement.querySelector(`#acquisitions`);

    const data = {
      labels: ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Earning',
          data: [65, 59, 80, 81, 56, 55, 60],

          fill: false,
          borderColor: '#0587eb',
          backgroundColor: 'white',

          tension: 0.1,
        },
      ],
    };
    const options = {
      color: 'white',
      scales: {
        x: {
          // <-- axis is not array anymore, unlike before in v2.x: '[{'
          border: {
            color: 'white',
          },
          ticks: {
            color: 'white',
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.295)',
            borderColor: 'rgba(255, 255, 255, 0.295)', // <-- this line is answer to initial question
          },
        },
        y: {
          // <-- axis is not array anymore, unlike before in v2.x: '[{'
          border: {
            color: 'white',
          },
          ticks: {
            color: 'white',
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.295)',
            borderColor: 'rgba(255, 255, 255, 0.295)', // <-- this line is answer to initial question
          },
        },
      },
    };
    this.myChart = new Chart(htmlRef, {
      type: 'line',
      data: data,
      options: options,
    });
  }
}
