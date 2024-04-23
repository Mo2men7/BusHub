import { Routes } from '@angular/router';
import { DestinationsComponent } from './admin/destinations/destinations.component';
import { BusesComponent } from './admin/buses/buses.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
export const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      {
        path: 'admin-destinations',
        component: DestinationsComponent,
      },
      {
        path: 'admin-buses',
        component: BusesComponent,
      },
    ],
  },
];
