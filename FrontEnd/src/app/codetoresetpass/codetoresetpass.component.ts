import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-codetoresetpass',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,RouterLinkActive,RouterLink],
  templateUrl: './codetoresetpass.component.html',
  styleUrl: './codetoresetpass.component.css',

})
export class CodetoresetpassComponent {


  constructor( private userservice : UserService,private router: Router,private cookie:CookieService) { }
  codeToResetPass = {
    // Initialize form data here
    email:<any> "",
    otp:"",

  };
  verifyCode() {
     this.userservice.getEmail().subscribe(
      res=>this.codeToResetPass.email=res
    );
    // console.log(this.codeToResetPass);
    this.userservice.setOtp(this.codeToResetPass.otp);
    this.userservice.verifycode(this.codeToResetPass).subscribe(
      res => {

        // console.log('Data sent successfully:', res);

        this.router.navigate(['resetpassword']);

       this.codeToResetPass = {
          // Initialize form data here
          email:<any> "",
          otp:"",

        };
        // this.router.navigate(['codetoresetpass']);
      },
      error => {
        console.error('Error sending data:', error);
      }
    );

}

}
