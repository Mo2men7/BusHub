import { Component, Input } from '@angular/core';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  // today=new Date();

  // formattedDate: string;

  // constructor() {
  //   const currentDate = new Date();
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
  //   const day = currentDate.getDate().toString().padStart(2, '0');
  //   const year = currentDate.getFullYear().toString().slice(-2); // Getting last two digits of the year
  //   this.formattedDate = `20${year}-${month}-${day}`;
  //   console.log(this.formattedDate);
  // }
  @Input() destinations:any;
}
