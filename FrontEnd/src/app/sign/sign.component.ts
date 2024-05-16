import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { NgModel } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { GoogleSigninButtonDirective, GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { from } from 'rxjs';



@Component({

  selector: 'app-sign',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,RouterLinkActive,RouterLink,GoogleSigninButtonModule,ReactiveFormsModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css'
})
export class SignComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  token: any;

  constructor(private fb:FormBuilder,private elRef: ElementRef, private renderer: Renderer2, private userservice: UserService, private router: Router, private cookie: CookieService, private authService: SocialAuthService) {

this.token=this.cookie.get("token");
    if (this.token) {
      this.router.navigate(["/"])
    }

    this.loginForm = this.fb.group({
      email: ["", [Validators.email,Validators.required]],
      password:["",[Validators.minLength(8)]]
    })
    this.registerForm = this.fb.group({
      email: ["", [Validators.email,Validators.required]],
      password: ["", [Validators.minLength(8),Validators.required]],
      username: ["", [Validators.required, Validators.minLength(4)]],
      gender: ["", [Validators.required]],
      city: ["", [Validators.required]],
      phone:["",[Validators.required]],
      birth_date: ["", [Validators.required]],
      password_confirmation:["",[Validators.required]],
    }, {
      validators: this.passwordMatchValidator

    })

  }
  submitCheck: boolean = false;
  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('password_confirmation')?.value? null : { 'mismatch': true };
  }
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

        // console.log('Data sent successfully:', response);

        this.cookie.set("token", this.loginResponse["token"]);
        this.router.navigate(['/']);

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


  loginResponse: any;
  gender: any;
  emailexist: boolean = false;
  changeEmailExist() {
    this.emailexist=false
  }
  onSubmit() {
    // console.log(this.registerForm.value)
    // console.log(this.formData)
    this.submitCheck = true;

    // Call the sendData method of DataService to send the form data
    const formDataJson: any = JSON.stringify(this.registerForm.value);

    // console.log(formDataJson);

    this.userservice.sendData(this.registerForm.value)
    .subscribe(
      response => {
        this.loginResponse = response;
        this.submitCheck =false;

        // console.log('Data sent successfully:', response);

        this.cookie.set("token", this.loginResponse["token"]);
        this.router.navigate(['/']);

        // Optionally, reset the form after successful submission
        // this.formData = {
        //   email: '',
        //   username: "",
        //   gender: "",
        //   city: "",
        //   phone: "",
        //   birth_date: "",
        //   password: "",
        //   password_confirmation: ""
        // };
      }
      ,
      error => {
        if (error.status === 422&&error.error.errors["email"]) {
          // Handle specific error message or perform any action
          console.error('The email has already been taken.');
          this.emailexist = true;

        }
        console.error('Error sending data:', error.error.errors);
      }
    )

  }

  loginData = {
    // Initialize form data here
  email: '',
   password:"",

  };

  passwordValid: boolean = true;
  dataValid: boolean = false;
  changeDataValid() {
    this.dataValid=false
  }
  onLogin() {
    // this.submitCheck = true;
   this.passwordValid = true;
    this.dataValid = false;
    const formDataJson: any = JSON.stringify(this.loginData);
    this.userservice.login(this.loginForm.value).subscribe(
      (response:any) => {

        this.loginResponse = response;
        // console.log(this.loginForm.value);
        this.cookie.set("token", this.loginResponse["token"]);
        // console.log(response.user.role)
        if (response.user.role=="user")
        this.router.navigate(['/']);
      else if (response.user.role=="admin")
        this.router.navigate(['/admin']);

        this.loginData = {
          email: '',

          password: "",
        };
      },
      error => {
        console.error('Error sending data:', error);
        this.dataValid = true;
        if (error.status == 401) {
         this.passwordValid=false
        }
        if (error.status == 422) {
          this.dataValid = true;
         }
      }
    );

  }




}






