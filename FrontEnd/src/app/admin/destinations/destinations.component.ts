import { Component } from '@angular/core';
import { DestinationService } from '../services/destinationService/destination.service';
import { SafePipe } from '../pipes/safe.pipe';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [SafePipe, FormsModule],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css',
})
export class DestinationsComponent {
  destinations: any;
  newDist: any;
  constructor(private destinationService: DestinationService,private cookie:CookieService,private router: Router) {}

  ngOnInit() {

    let token = this.cookie.get("token");

    console.log(token);
    this.destinationService.listDestinations(token).subscribe(
      (res: any) => (this.destinations = res),
      // (error) =>  this.router.navigate(['/signin'])
      (error) => console.log(error)


    );
  }
  sendDestination(form: any) {
    this.newDist = {
      name: form.form.value.name,
      info: form.form.value.info,
      flag: form.form.value.flag,
      pic: form.form.value.pic,
      map: form.form.value.map,
    };

    this.destinationService.addDestinations(this.newDist).subscribe(
      (res) => this.ngOnInit(),
      (error) => console.log(error)
    );
    // console.log(form);
  }
  showMap(id: any) {
    const map = this.destinations[id].map;
    const img = document.getElementsByTagName('img')[document.getElementsByTagName('img').length-1];
    img.style.display="none"
    const getFrame = document.getElementsByTagName('iframe')[document.getElementsByTagName('iframe').length-1];
    // console.log(getFrame)
    const getDivFrame = document.getElementById('iframeDiv');
    getDivFrame?.classList.remove('active');
    getDivFrame?.classList.remove('show');
    getFrame.src=map;
    setTimeout(function () {

      getDivFrame?.classList.add('active');
      getDivFrame?.classList.add('show');
    }, 500);

    // getFrame.classList.add('fade-in');
    console.log(id);
    console.log(this.destinations);
  }
  //   var div = document.querySelector(".fade");

  // btn.addEventListener("click", function(){
  //   div.classList.add("elementToFadeInAndOut");
  //   // Wait until the animation is over and then remove the class, so that
  //   // the next click can re-add it.
  //   setTimeout(function(){div.classList.remove("elementToFadeInAndOut");}, 4000);
  // });
}
