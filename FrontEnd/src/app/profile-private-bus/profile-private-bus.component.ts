import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrivateBusService } from '../services/private-bus.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

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
    private http: HttpClient,
    private userservice:UserService,
    private cookie:CookieService,
  ) {}
  PBRequests: any;
  token: any = this.cookie.get('token');
  userData: any;
  ngOnInit() {
    this.PrivateBusService.getPrivateBusRequests().subscribe((res) => {
      // console.log(res);
      this.PBRequests = res;
    });
    this.userservice.userProfile(this.token).subscribe(
      res => {
        this.userData = res;
      }
    );
  }
}