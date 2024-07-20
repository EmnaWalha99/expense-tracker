import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-addexpense',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './addexpense.component.html',
  styleUrl: './addexpense.component.css'
})
export class AddexpenseComponent {

}
