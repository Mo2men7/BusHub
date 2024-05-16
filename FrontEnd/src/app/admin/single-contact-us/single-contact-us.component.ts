import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-single-contact-us',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './single-contact-us.component.html',
  styleUrl: './single-contact-us.component.css',
})
export class SingleContactUsComponent {
  id: any;
  constructor(
    private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ) {}
  contactUsData: any;
  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      const id = params['id'];
      // console.log(id);
      this.http
        .get(`http://127.0.0.1:8000/api/contactus/${id}`)
         .subscribe((res) => {
          this.contactUsData = res;
          // console.log(res);
          // console.log(this.contactUsData);
        });
    });
  }
  navigate(){
    // this.router.navigate(['/admin'], { queryParams: { reload: 'fresh' } });
    this.router.navigate(['/admin/admin-contact']);
  }
}
