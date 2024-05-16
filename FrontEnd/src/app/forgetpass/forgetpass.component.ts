import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgetpass',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,RouterLinkActive,RouterLink],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css'
})
export class ForgetpassComponent {
  constructor(private elRef: ElementRef, private renderer: Renderer2, private userservice : UserService,private router: Router,private cookie:CookieService) { }

  emailToResetPass = {
    // Initialize form data here
   email: '',

  };

  sendCode() {
    this.userservice.forgetPassword(this.emailToResetPass).subscribe(
      response => {

        // console.log('Data sent successfully:', response);

        this.userservice.setEmail(this.emailToResetPass.email);
        this.router.navigate(['codetoresetpass']);

        // this.router.navigate(['/profile','edituserdetails']);

        // Optionally, reset the form after successful submission
        this.emailToResetPass = {
          email: ''

        };
      },
      error => {
        console.error('Error sending data:', error);
      }
    )
  }
}
