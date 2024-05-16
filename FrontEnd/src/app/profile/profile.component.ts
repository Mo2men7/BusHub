import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdituserdetailsComponent } from '../edituserdetails/edituserdetails.component';
import { PrevioustripsComponent } from '../previoustrips/previoustrips.component';
import { CookieService } from 'ngx-cookie-service';
import { NexttripsComponent } from '../nexttrips/nexttrips.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { MatTabsModule } from '@angular/material/tabs';
import Swal from 'sweetalert2';
import { pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfilePrivateBusComponent } from '../profile-private-bus/profile-private-bus.component';
import { OrdersComponent } from '../admin/orders/orders.component';
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoaderComponent, ProfilePrivateBusComponent,RouterOutlet,ReactiveFormsModule,OrdersComponent, CommonModule,FormsModule,RouterLinkActive,RouterLink,EdituserdetailsComponent,PrevioustripsComponent,NexttripsComponent,NavbarComponent,FooterComponent,MatTabsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  loading: boolean = true;
  userId: any;
  userData: any;
  form: FormGroup;

  token: any;
  constructor(private userservice: UserService,private fb:FormBuilder,private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private cookie: CookieService) {
   this.token = this.cookie.get("token");

    if(!this.token) {
      this.router.navigate(["/signin"]);
    }

    // this.form = this.fb.group({
    //   pic:[null]
    // })
    this.form = new FormGroup({

      pic: new FormControl('')
    });
  }



  ngOnInit(): void {
    this.token = this.cookie.get("token");

    // this.userId = this.activatedRoute.snapshot.params["id"];
    // console.log(this.token)

    this.userservice.userProfile(this.token).subscribe(
      res => {
        this.loading=false
        this.userData = res;
        // console.log(this.cookie.get("token"))
        // console.log(this.userData);
      },error => {
        this.loading=true

      }
    )



  }
  // formData:any = {
  //   image:""
  // }

  onFileSelectedPic(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      // Create a FormData object
      // const formData = new FormData();
      // formData.append('pic', file);
      // console.log(formData);

      // Set the FormData object as the value of the form control
        this.form.patchValue({
          pic: file
        });
    }
  }

  // addphoto() {
  //   const formData = new FormData();
  //   formData.append('pic', this.form.controls['pic'].value);
  //   this.userservice.changeProfilePhoto(formData,this.token).subscribe(
  //     res => {
  //       // console.log(this.formData)
  //       console.log(res);
  //       this.ngOnInit();
  //     }
  //   )
  // }

}
