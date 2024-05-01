import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DestinationService } from '../services/destination.service';
import { TypeService } from '../services/typeService/type.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

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
  alertmessage:any;
  constructor(
    private destinationService: DestinationService,
    private http: HttpClient,
    private TypeService: TypeService
    ,   private cookie:CookieService
  ) {}
  ngOnInit() {

    let token=this.cookie.get("token")
    this.destinationService
      .getDestinations(token)
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
  submitPrivateBusForm() {
    this.http
      .post('http://127.0.0.1:8000/api/private-bus', this.formData)
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
          this.alertmessage = `Your request has been submit successfully, An admin will reply to you soon. Watch your notifications`;
        },
        (error) => {
          console.error('Error');
        }
      );
  }
}
