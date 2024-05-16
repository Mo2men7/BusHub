import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripsService } from '../services/trips.service';
import { NgModel } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edituserdetails',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,ReactiveFormsModule,RouterLinkActive,RouterLink],
  templateUrl: './edituserdetails.component.html',
  styleUrl: './edituserdetails.component.css'
})
export class EdituserdetailsComponent {

  editForm: FormGroup;
  userDetails:any = {
    phone: ``,
    email: "",
    username: "",
    city: "",
    gender:""
   };
  constructor(private fb:FormBuilder, private userservice: UserService, private activatedRoute: ActivatedRoute, private router: Router, private cookie: CookieService) {

    this.editForm = this.fb.group({
        email: [""],
        username: [""],
        pic: [""],
        city: [""],
      phone: [""],
        gender:[""],


    })
  }

  userId: any;
  userData: any;
  username: any;
  email: any;
  phone: any;
  city: any;
  gender:any
  token = this.cookie.get("token");


  ngOnInit(): void {

    // this.userId = this.activatedRoute.snapshot.params["id"];
    // console.log(this.userId)

    this.userservice.userProfile(this.token).subscribe(
      res => {
        this.userData = res;
        // console.log(this.userData);
        this.email = this.userData.email
        this.username = this.userData.username
        this.phone = this.userData.phone
        this.city=this.userData.city



        this.userDetails = {
          phone: `${this.phone}`,
          email: `${this.email}`,
          username: `${this.username}`,
          city: `${this.city}`,
          gender:`${this.userData.gender}`,

        };
        this.editForm.patchValue({
          email: this.userDetails.email,
          username: this.userDetails.username,
          city: this.userDetails.city,
          phone: this.userDetails.phone,
          gender:this.userDetails.gender
      });

      }
    )


  }

  onFileSelectedPic(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      // Create a FormData object
      // const formData = new FormData();
      // formData.append('pic', file);
      // console.log(formData);

      // Set the FormData object as the value of the form control
        this.editForm.patchValue({
          pic: file
        });
    }
  }
  incomeData: any;
  edit() {
    const formData = new FormData();
    formData.append('pic', this.editForm.controls['pic'].value);
    formData.append('email', this.editForm.controls['email'].value);
    formData.append('gender', this.editForm.controls['gender'].value);

    formData.append('phone', this.editForm.controls['phone'].value);
    formData.append('city', this.editForm.controls['city'].value);
    formData.append('username', this.editForm.controls['username'].value);


    const formDataJson: any = JSON.stringify(formData);
    // console.log(this.userDetails);
    this.userservice.editUserDetails(formData,this.token).subscribe(
      (res?) =>{
        // console.log(res );

      this.incomeData = res;
    // const userid = this.incomeData["user"].id;

    window.location.reload();

    //  this.router.navigate(['/profile']);
    //  this.userDetails = {
    //   phone: "",
    //   email: "",
    //   username: ""
    //  };
  },
      error => {
        console.error('Error sending data:', error);
      }
    )
  }
}
