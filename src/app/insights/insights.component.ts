import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css'
})
export class InsightsComponent {

}
