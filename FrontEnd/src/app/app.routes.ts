import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SignComponent } from './sign/sign.component';
import { PrevioustripsComponent } from './previoustrips/previoustrips.component';
import { EdituserdetailsComponent } from './edituserdetails/edituserdetails.component';
import { NexttripsComponent } from './nexttrips/nexttrips.component';

export const routes: Routes = [


    {
      path: "",
      component: SignComponent,
      title:"signin"
    }
  ,{
    path: "profile",
    component: ProfileComponent,
    // title: "Profile"
     children: [
      {
        path: "previoustrips",
        component: PrevioustripsComponent,
        // title:"Previous Trips"
      },
      {
        path: "edituserdetails",
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





];
