import { Routes } from '@angular/router';
import { DestinationsComponent } from './admin/destinations/destinations.component';
import { BusesComponent } from './admin/buses/buses.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PrivateBusPageComponent } from './private-bus-page/private-bus-page.component';
import { TripsshowComponent } from './Components1/tripsshow/tripsshow.component';

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
  {
    path: '',
    component: HomepageComponent,
    title: 'BusHub',
 },
 {
  path: 'privatebus',
  component: PrivateBusPageComponent,
  title: 'PrivateBus',
  },
  {
    path: 'trips',
    component:TripsshowComponent,
    title: 'trips',

  }
];
