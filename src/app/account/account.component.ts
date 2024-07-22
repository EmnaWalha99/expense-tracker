import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,ProfileComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class DashbordComponent {

}
