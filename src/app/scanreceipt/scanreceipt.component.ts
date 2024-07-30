import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-scanreceipt',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './scanreceipt.component.html',
  styleUrls: ['./scanreceipt.component.css']
})
export class ScanreceiptComponent {

  

}
