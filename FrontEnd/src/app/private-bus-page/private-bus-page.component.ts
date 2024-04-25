import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { DestinationService } from '../services/destination.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-private-bus-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule, ],
  templateUrl: './private-bus-page.component.html',
  styleUrl: './private-bus-page.component.css'
})
export class PrivateBusPageComponent {
  destinations: any;
  constructor(private destinationService:DestinationService, private http:HttpClient){}
  ngOnInit(){
    
    this.destinationService.getDestinations().subscribe((res:any)=>this.destinations=res)
  }
  formData={
    name : '',
    phone : '',
    from : '',
    to : '',
    bus_type_id : '',
    passenger_number : '',
    departure_date : '',
    return : '',
  }
  submitPrivateBusForm(){
    this.http.post('http://127.0.0.1:8000/api/private-bus', this.formData).subscribe((res)=>{
      console.log("Done");
      this.formData.name="";
      this.formData.phone="";
      this.formData.from="";
      this.formData.to="";
      this.formData.bus_type_id="";
      this.formData.passenger_number="";
      this.formData.departure_date="";
      this.formData.return="";
      
    }, error => {
      console.error("Error");
    });
  }
}