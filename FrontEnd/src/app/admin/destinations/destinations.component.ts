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
  newDist:any;
  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    this.destinationService.listDestinations().subscribe(
      (res: any) => (this.destinations = res),
      (error) => console.log(error)
    );
  }
  sendDestination(form: any) {
    this.newDist={
      'name':form.form.value.name,
      'info':form.form.value.info,
      'flag':form.form.value.flag,
      'pic':form.form.value.pic,
      'map':form.form.value.map,
    }
    
    
    this.destinationService.addDestinations(this.newDist).subscribe((res)=>this.ngOnInit(),
      (error) => console.log(error)
    );
    // console.log(form);
  }
  // display() {
  //   this.
  //   );
}
