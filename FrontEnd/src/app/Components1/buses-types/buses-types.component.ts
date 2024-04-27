import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-buses-types',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,MatTabsModule],
  templateUrl: './buses-types.component.html',
  styleUrl: './buses-types.component.css'
})
export class BusesTypesComponent {

}
