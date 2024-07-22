import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  
  imports: [RouterOutlet,SidebarComponent,NgIf,CommonModule],
  templateUrl:   './profile.component.html',

  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {

  user: any;
  

  private authService=inject(AuthService);
  username=this.authService.getUser().username;
  email=this.authService.getUser().email;

  ngOnInit(): void {
      this.user=this.authService.getUser();
      
    
  }

}
