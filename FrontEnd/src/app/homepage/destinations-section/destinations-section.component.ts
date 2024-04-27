import { Component } from '@angular/core';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-destinations-section',
  standalone: true,
  imports: [],
  templateUrl: './destinations-section.component.html',
  styleUrl: './destinations-section.component.css'
})
export class DestinationsSectionComponent {
  destinations: any;
  constructor (private destinationService:DestinationService){}
  ngOnInit(){
    this.destinationService.getDestinations().subscribe((res:any)=>this.destinations=res);
  }
}
