import { Component } from '@angular/core';
import { DestinationService } from '../services/destinationService/destination.service';
import { SafePipe } from '../pipes/safe.pipe';
import { FormsModule } from '@angular/forms';
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
  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    this.destinationService.listDestinations().subscribe(
      (res: any) => (this.destinations = res),
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
    const getFrame = document.getElementsByTagName('iframe')[0];
    const getDivFrame = document.getElementById('iframeDiv');
    getDivFrame?.classList.remove('fadein');
    getDivFrame?.classList.add('elementToFadeout');
    setTimeout(function(){getDivFrame?.classList.remove("elementToFadeout");}, 5000);
    getDivFrame?.classList.add('fadeout');
    const map = this.destinations[id].map;
    getFrame.src = map;
    getDivFrame?.classList.add('elementToFadeIn');

    setTimeout(function(){getDivFrame?.classList.remove("elementToFadeIn");}, 5000);
    getDivFrame?.classList.remove('fadeout');
    getDivFrame?.classList.add('fadein');
    
    

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
