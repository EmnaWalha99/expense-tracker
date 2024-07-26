import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  
  imports: [RouterOutlet, SidebarComponent, NgIf, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user: any;
  username: string | undefined; 
  email: string | undefined; 

  // dependency injection
  authService = inject(AuthService);
  router=inject(Router);
  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log(this.user);

    if (this.user) {
      this.username = this.user.username;
      this.email = this.user.email;
      console.log('Username:', this.username);
      console.log('Email:', this.email);
      console.log('LocalStorage:', localStorage.getItem('authUser'));
    } else {
      console.error("User not found in local storage.");
    }
  }
  public logout(){
    this.authService.logout() ;
    this.router.navigate(['/login']);
  }

}
