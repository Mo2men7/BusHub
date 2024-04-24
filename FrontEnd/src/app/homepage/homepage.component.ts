import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { SearchComponent } from './search/search.component';
import { WhyComponent } from './why/why.component';
import { DestinationsSectionComponent } from './destinations-section/destinations-section.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    SearchComponent,
    WhyComponent,
    DestinationsSectionComponent,
    FooterComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
