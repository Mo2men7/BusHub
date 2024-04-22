import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripsComponent } from './trips/trips.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TripsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
