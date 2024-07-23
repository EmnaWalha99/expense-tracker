import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,RouterLink,ReactiveFormsModule,RouterModule
    
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  router=inject(Router);
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  
    onSubmit() {
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe({
          next: (data: any) => {
            console.log('Login successful:', data);
            this.router.navigate(['/profile']);//{state: {user: data.user}} // => the the profile
          },
          error: (err) => {
            console.error('Login failed:', err);
          }
        });
      }
    }
  }
