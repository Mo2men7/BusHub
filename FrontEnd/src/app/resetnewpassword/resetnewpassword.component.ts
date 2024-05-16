import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-resetnewpassword',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,RouterLinkActive,RouterLink],
  templateUrl: './resetnewpassword.component.html',
  styleUrl: './resetnewpassword.component.css'
})
export class ResetnewpasswordComponent {
  constructor( private userservice : UserService,private router: Router,private cookie:CookieService) { }
  dataToResetPass = {
    // Initialize form data here
    email: <any>"",
    password: "",
    otp:''


  };

  resetPass() {
    this.userservice.getEmail().subscribe(
     res=>this.dataToResetPass.email=res
   );
    // console.log(this.dataToResetPass);

    this.userservice.getOtp().subscribe(
      res=>this.dataToResetPass.otp=res
    );
   this.userservice.resetPassword(this.dataToResetPass).subscribe(
     res => {

      //  console.log('Data sent successfully:', res);

       this.router.navigate(['/signin']);

      this.dataToResetPass = {
         // Initialize form data here
        email: "",
        password: "",
        otp:""


       };

       // this.router.navigate(['codetoresetpass']);
     },
     error => {
       console.error('Error sending data:', error);
     }
   );

}
}
