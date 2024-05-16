import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PrivateBusService } from '../../services/private-bus.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  constructor(
    private PrivateBusService: PrivateBusService,
    private http: HttpClient
  ) {}
  PBRequests: any;
  ngOnInit() {
    this.PrivateBusService.getPrivateBusRequests().subscribe((res) => {
      // console.log(res);
      this.PBRequests = res;
    });
  }

  onRequestAccept(id: any) {
    // console.log(id);
    this.http
      .put(`http://127.0.0.1:8000/api/private-bus-requests/${id}/accept`, {})
      .subscribe((res: any) => {
        // console.log(res);
        // const index = this.PBRequests.findIndex(
        //   (request: any) => request.id === id
        // );
        // if (index !== -1) {
        // this.PBRequests[index].status = 'Accepted';
        this.PBRequests[id - 1].status = 'Accepted';
        // }
      });
  }

  onRequestDecline(id: any) {
    this.http
      .put(`http://127.0.0.1:8000/api/private-bus-requests/${id}/decline`, {})
      .subscribe((res: any) => {
        // console.log(res);
        this.PBRequests[id - 1].status = 'Rejected';
      });
  }
}
