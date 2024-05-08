import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterLinkActive,
    RouterLink,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent {
  constructor(private userservice: UserService, private cookie: CookieService ,private router:Router) { }
  token: any
  ngOnInit(): void {
    this.token = this.cookie.get("token");


  }
  contactForm = {
    username: "",
    email: "",
    message: "",

  }
  onsubmit(contactusForm: any) {

    if (this.token) {
    this.userservice.contactus(this.contactForm, this.token).subscribe(
      res => {
        console.log(res);
        this.contactForm = {
          username: "",
          email: "",
          message: "",

        }
        console.log(contactusForm);

        Object.keys(contactusForm.controls).forEach((controlName) => {
          // Mark each control as untouched
          contactusForm.controls[controlName].markAsUntouched();
        });


      }
    );

    }
    else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to send, you must sign up !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "sign up",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/signin"]);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            // text: "We are here to assist you anytime  :)",
            icon: "error"
          });
        }
      });
    }
}


}
