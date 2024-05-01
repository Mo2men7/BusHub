import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgModel } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { GoogleSigninButtonDirective, GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { from } from 'rxjs';



@Component({

  selector: 'app-sign',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,RouterLinkActive,RouterLink,GoogleSigninButtonModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css'
})
export class SignComponent {
  constructor(private elRef: ElementRef, private renderer: Renderer2, private userservice : UserService,private router: Router,private cookie:CookieService,private authService: SocialAuthService) { }
  user: any;
  loggedIn: any;
  ngOnInit(): void {
    // Simulate HTTP request
    // this.simulateHttpRequest(this.loginData);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (user) {
        this.onGoogleregister();
      }
    });

  }

  onGoogleregister() {



    // // if (this.user) {
    let formData = {
      // Initialize form data here

      email: this.user.email,
      username: this.user.name,

    };
    this.userservice.signByGoogle(formData).subscribe(
      response => {
        this.loginResponse = response;

        console.log('Data sent successfully:', response);

        this.cookie.set("token", this.loginResponse["token"]);
        this.router.navigate(['/profile']);

        // Optionally, reset the form after successful submission
        formData = {
          email: '',
          username: "",

        };
      },
      error => {
        console.error('Error sending data:', error);
      }
    );



}


  // simulateHttpRequest(data:any): void {
  //   // Simulate HTTP response
  //   // const responseData =this.loginData;

  //   // Send the response data to DataService
  //   this.userservice.sendUserData(data);
  // }












  togglePanel(isSignUpActive: boolean): void {
    const container = this.elRef.nativeElement.querySelector('.container');
    if (isSignUpActive) {
      this.renderer.addClass(container, 'right-panel-active');
    } else {
      this.renderer.removeClass(container, 'right-panel-active');
    }
  }
  // send(data:any) {
  //   // const dataToSend = { /* Your data here */ };
  //   this.userservice.sendUserData(data);
  // }


  formData = {
    // Initialize form data here

    email: '',
    username: "",
    gender: "",
    city: "",
    phone: "",
    birth_date:"",
    password:"",
    password_confirmation:""
  };


  loginResponse: any;
  onSubmit() {
    // Call the sendData method of DataService to send the form data
    const formDataJson: any = JSON.stringify(this.formData);

    // console.log(formDataJson);

    this.userservice.sendData(this.formData).subscribe(
      response => {
        this.loginResponse = response;

        console.log('Data sent successfully:', response);

        this.cookie.set("token", this.loginResponse["token"]);
        this.router.navigate(['/profile']);

        // Optionally, reset the form after successful submission
        this.formData = {
          email: '',
          username: "",
          gender: "",
          city: "",
          phone: "",
          birth_date:"",
          password:"",
          password_confirmation:""
        };
      },
      error => {
        console.error('Error sending data:', error);
      }
    );

  }

  loginData = {
    // Initialize form data here
  email: '',
   password:"",

  };


  onLogin() {
    const formDataJson: any = JSON.stringify(this.loginData);
    this.userservice.login(formDataJson).subscribe(
      (response:any) => {

        this.loginResponse = response;
        const userid = this.loginResponse["user"].id
        this.cookie.set("token", this.loginResponse["token"]);
        console.log(response.user.role)
        if (response.user.role=="user")
        this.router.navigate(['/profile']);
      else if (response.user.role=="admin")
        this.router.navigate(['/admin']);

        this.loginData = {
          email: '',

          password: "",
        };
      },
      error => {
        console.error('Error sending data:', error);
      }
    );

  }




}






