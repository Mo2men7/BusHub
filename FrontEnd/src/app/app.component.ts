import { Component,Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DestinationsComponent } from './admin/destinations/destinations.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { BusesComponent } from './admin/buses/buses.component';
import { TripsshowComponent } from './Components1/tripsshow/tripsshow.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { ContactusComponent } from './contactus/contactus.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DestinationsComponent,SidebarComponent,BusesComponent,TripsshowComponent, CommonModule,FormsModule,ProfileComponent,HttpClientModule,SocialLoginModule,ContactusComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
  constructor() { }

  // togglePanel(isSignUpActive: boolean): void {
  //   const container = this.elRef.nativeElement.querySelector('.container');
  //   if (isSignUpActive) {
  //     this.renderer.addClass(container, 'right-panel-active');
  //   } else {
  //     this.renderer.removeClass(container, 'right-panel-active');
  //   }
  // }

  // formData = {
  //   // Initialize form data here

  //   email: '',
  //   username: "",
  //   gender: "",
  //   city: "",
  //   phone: "",
  //   birth_date:"",
  //   password:"",
  //   password_confirmation:""
  // };



  // onSubmit() {
  //   // Call the sendData method of DataService to send the form data
  //   const formDataJson: any = JSON.stringify(this.formData);
  //   const  newg={
  //     'username':this.formData.username,
  //     'email':this.formData.email,
  //     'password': this.formData.password,
  //     'password_confirmation':this.formData.password_confirmation,
  //     'gender':this.formData.gender,
  //     'city': this.formData.city,
  //     "phone": this.formData.phone,
  //     "birth_date":this.formData.birth_date
  //   }
  //   // console.log(formDataJson);

  //   this.userservice.sendData(newg).subscribe(
  //     response => {
  //       console.log('Data sent successfully:', response);
  //       // Optionally, reset the form after successful submission
  //       this.formData = {
  //         email: '',
  //         username: "",
  //         gender: "",
  //         city: "",
  //         phone: "",
  //         birth_date:"",
  //         password:"",
  //         password_confirmation:""
  //       };
  //     },
  //     error => {
  //       console.error('Error sending data:', error);
  //     }
  //   );

  // }



    // this.userId = this.activatedRoute.snapshot.params["id"];
    // console.log(this.userId);

    // this.userservice.userProfile(this.userId).subscribe(
    //   res => {
    //     this.userData = res;
    //     console.log(this.userData);
    //   }
    // );


}
