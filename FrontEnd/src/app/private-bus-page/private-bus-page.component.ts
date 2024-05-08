import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DestinationService } from '../services/destination.service';
import { TypeService } from '../services/typeService/type.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-private-bus-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule],
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
    private cookie: CookieService
  ) {}
  ngOnInit() {
    this.destinationService
      .getDestinations()
      .subscribe((res: any) => (this.destinations = res));
    this.TypeService.getBusTypes().subscribe((res) => (this.busTypes = res));
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
  submitPrivateBusForm(privateBusForm:any) {
    let token = this.cookie.get('token');
    let httpOptions = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http
      .post('http://127.0.0.1:8000/api/private-bus', this.formData, {
        headers: httpOptions,
      })
      .subscribe(
        (res) => {
          console.log('Done');
          this.formData.name = '';
          this.formData.phone = '';
          this.formData.from = '';
          this.formData.to = '';
          this.formData.bus_type_id = '';
          this.formData.passenger_number = '';
          this.formData.departure_date = '';
          this.formData.return = '';
          Swal.fire({
            icon: 'success',
            title: 'Your request has been submit successfully',
          });
        },
        (error) => {
          console.error('Error');
        }
      );
      Object.keys(privateBusForm.controls).forEach(controlName => {
        // Mark each control as untouched
        privateBusForm.controls[controlName].markAsUntouched();
      });
  }
}
