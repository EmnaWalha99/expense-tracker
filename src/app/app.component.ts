import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,RouterLink,RouterLinkActive,LoginComponent
    ,SignupComponent,CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expense-tracker';
  /*
  constructor(private router : Router){}
  isLoginPage(): boolean {
    const currentRoute = this.router.url ; 
    return currentRoute.includes('/login') ;
  }
    */
 

}
