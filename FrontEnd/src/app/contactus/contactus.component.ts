import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLinkActive, RouterLink,NavbarComponent,FooterComponent],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  constructor(private userservice: UserService, private cookie: CookieService) { }
  token:any
  ngOnInit(): void {
  this.token = this.cookie.get("token");


  }
  contactForm = {
    username: "",
    email: "",
    message:"",

  }
  onsubmit(contactusForm:any) {
    console.log(this.contactForm);

    this.userservice.contactus(this.contactForm, this.token).subscribe(
      res => {
        console.log(res);
        this.contactForm = {
          username: "",
          email: "",
          message:"",

        }
        console.log(contactusForm);

        Object.keys(contactusForm.controls).forEach(controlName => {
          // Mark each control as untouched
          contactusForm.controls[controlName].markAsUntouched();
        });


      }
    );

  }


}
