import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
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
export class HomepageComponent {
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  // Listen for the scroll event
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const btn = this.elRef.nativeElement.querySelector('#btn');

    // Show/hide the button based on scroll position
    if (scrollY >= 200) {
      this.renderer.setStyle(btn, 'display', 'block');
    } else {
      this.renderer.setStyle(btn, 'display', 'none');
    }
  }}
