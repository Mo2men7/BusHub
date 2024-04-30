import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SignComponent } from './sign/sign.component';
import { PrevioustripsComponent } from './previoustrips/previoustrips.component';
import { EdituserdetailsComponent } from './edituserdetails/edituserdetails.component';
import { NexttripsComponent } from './nexttrips/nexttrips.component';
import { DestinationsComponent } from './admin/destinations/destinations.component';
import { BusesComponent } from './admin/buses/buses.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PrivateBusPageComponent } from './private-bus-page/private-bus-page.component';
import { TripsshowComponent } from './Components1/tripsshow/tripsshow.component';
import { DestinationsPageComponent } from './destinations-page/destinations-page.component';
import { OrdersComponent } from './admin/orders/orders.component';

import { AdminComponent } from './admin/admin.component';
import { BusesTypesComponent } from './Components1/buses-types/buses-types.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { CodetoresetpassComponent } from './codetoresetpass/codetoresetpass.component';
import { ResetnewpasswordComponent } from './resetnewpassword/resetnewpassword.component';






export const routes: Routes = [

  {
    path: "signin",
    component: SignComponent,
    title:"signin"
  },
  {
    path: "codetoresetpass",
    component: CodetoresetpassComponent,
    title:"CodeToresetpass"
  },
  {
    path: "resetpassword",
    component:ResetnewpasswordComponent,
    title:"CodeToresetpass"
  },
  {
    path: "forgetpass",
    component: ForgetpassComponent,
    title:"ForgetPassword"
  }

,{
  path: "profile",
  component: ProfileComponent,
  title: "Profile",
   children: [
    {
      path: "previoustrips",
      component: PrevioustripsComponent,
      // title:"Previous Trips"
    },
    {
      path: "",
      component: EdituserdetailsComponent
      // ,title:"Edit User Details"
     },
     {
      path: "nexttrips",
      component: NexttripsComponent
      // ,title:"Edit User Details"
    }
  ]
},

  {
    path: 'admin',
    component: AdminComponent,
    children: [

      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'admin-destinations',
        component: DestinationsComponent,
      },
      {
        path: 'admin-buses',
        component: BusesComponent,
      },
      {
        path: 'admin-orders',
        component: OrdersComponent,
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
    component: TripsshowComponent,
    title: 'trips',
  },


  {
    path: 'buses-types',
    component: BusesTypesComponent,
    title: 'buses',

  },{
    path: 'destinations',
    component: DestinationsPageComponent,
    title: 'Our Destinations',
  },

];
