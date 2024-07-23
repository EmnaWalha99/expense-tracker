import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  authService = inject(AuthService);
  router=inject(Router);
  public logout(){
    this.authService.logout() ;
    this.router.navigate(['/login']);
    console.log(this.authService.isLoggedIn());
  }
  

}
