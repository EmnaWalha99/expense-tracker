import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-scanreceipt',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './scanreceipt.component.html',
  styleUrl: './scanreceipt.component.css'
})
export class ScanreceiptComponent {


}