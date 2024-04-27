import { Component } from '@angular/core';
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  destinations:any;
  constructor(private destinationService:DestinationService){}
  ngOnInit(){
    this.destinationService.getDestinations().subscribe((res:any)=>this.destinations=res)
  }
}
