import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PrivateBusService } from '../../services/private-bus.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  constructor(private PrivateBusService:PrivateBusService){}
  PBRequests:any;
  ngOnInit(){
    this.PrivateBusService.getPrivateBusRequests().subscribe((res)=>{
      console.log(res);
      this.PBRequests=res;
    })
  }
}
