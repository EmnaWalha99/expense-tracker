import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,ProfileComponent],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

}
