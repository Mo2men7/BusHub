import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrivateBusService } from '../services/private-bus.service';
@Component({
  selector: 'app-profile-private-bus',
  standalone: true,
  imports: [],
  templateUrl: './profile-private-bus.component.html',
  styleUrl: './profile-private-bus.component.css'
})
export class ProfilePrivateBusComponent {
  constructor(
    private PrivateBusService: PrivateBusService,
    private http: HttpClient
  ) {}
  PBRequests: any;
  ngOnInit() {
    this.PrivateBusService.getPrivateBusRequestsFromUser(1).subscribe((res) => {
      console.log(res);
      this.PBRequests = res;
    });
  }
}
