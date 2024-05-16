import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DestinationService } from '../services/destination.service';
import { TypeService } from '../services/typeService/type.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-private-bus-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule, LoaderComponent],
  templateUrl: './private-bus-page.component.html',
  styleUrl: './private-bus-page.component.css',
})
export class PrivateBusPageComponent {
  destinations: any;
  busTypes: any;
  alertmessage: any;
  constructor(
    private destinationService: DestinationService,
    private http: HttpClient,
    private TypeService: TypeService,
    private cookie: CookieService,
    private router: Router
  ) {}
  ngOnInit() {
    this.destinationService
      .getDestinations()
      .subscribe((res: any) => (this.destinations = res));
    this.TypeService.getBusTypes().subscribe((res) => (this.busTypes = res));
     //locked previous days
    //  console.log('2dat',this.today);
    //  console.log('ccc',this.newDate);
    // document.getElementsByName('departure_date')[0].setAttribute('min', this.today);
    // document.getElementsByName('departure_date')[0].setAttribute('max', this.newDate);


  }
  formData = {
    name: '',
    phone: '',
    from: '',
    to: '',
    bus_type_id: '',
    passenger_number: '',
    departure_date: '',
    return: '',
  };
  submitCheck: boolean = false;
  submitPrivateBusForm(privateBusForm: any) {
    let token = this.cookie.get('token');
    this.submitCheck = true;
    if (token) {
      let httpOptions = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + token
      );
      this.http
        .post('http://127.0.0.1:8000/api/private-bus', this.formData, {
          headers: httpOptions,
        })
        .subscribe(
          (res) => {
            // console.log('Done');
            this.formData.name = '';
            this.formData.phone = '';
            this.formData.from = '';
            this.formData.to = '';
            this.formData.bus_type_id = '';
            this.formData.passenger_number = '';
            this.formData.departure_date = '';
            this.formData.return = '';
            this.submitCheck = false;

            Swal.fire({
              icon: 'success',
              title: 'Your request has been submit successfully',
            });
            Object.keys(privateBusForm.controls).forEach((controlName) => {
              // Mark each control as untouched
              privateBusForm.controls[controlName].markAsUntouched();
            });
          },
          (error) => {
            console.error('Error');
          }
        );
    } else {
      this.router.navigate(['/signin']);
      //   const swalWithBootstrapButtons = Swal.mixin({
      //     customClass: {
      //       confirmButton: "btn btn-success",
      //       cancelButton: "btn btn-danger"
      //     },
      //     buttonsStyling: false
      //   });
      //   swalWithBootstrapButtons.fire({
      //     title: "Are you sure?",
      //     text: "You won't be able to book, you must sign up !",
      //     icon: "warning",
      //     showCancelButton: true,
      //     confirmButtonText: "sign up",
      //     cancelButtonText: "No, cancel!",
      //     reverseButtons: true
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       this.router.navigate(["/signin"]);
      //     } else if (
      //       /* Read more about handling dismissals below */
      //       result.dismiss === Swal.DismissReason.cancel
      //     ) {
      //       swalWithBootstrapButtons.fire({
      //         title: "Cancelled",
      //         // text: "We are here to assist you anytime  :)",
      //         icon: "error"
      //       });
      //     }
      // });
    }
  }
  //locked previous days variable
  today =
    new Date()
      .toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' })
      .split('/')[2] +
    '-' +
    new Date()
      .toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' })
      .split('/')[0]
      .padStart(2, '0') +
    '-' +
    new Date()
      .toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' })
      .split('/')[1]
      .padStart(2, '0');

  // maxDate =
  initialDateInMillis = new Date().getTime();
  sevenDaysInMillis = 6 * 24 * 60 * 60 * 1000;
  maxDate = this.initialDateInMillis + this.sevenDaysInMillis;
  newDate =
    new Date(this.maxDate)
      .toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' })
      .split('/')[2] +`-0`+
    new Date(this.maxDate)
      .toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' })
      .split('/')[0] +`-`+
    new Date(this.maxDate)
      .toLocaleDateString('en-US', { timeZone: 'Africa/Cairo' })
      .split('/')[1];




}
