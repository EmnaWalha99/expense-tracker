import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NgIf, CommonModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user: any;
  username: string | undefined; 
  email: string | undefined; 
  id: Number|undefined;


  // Dependency injection
  authService = inject(AuthService);
  router = inject(Router);
  public profileForm = new FormGroup({
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    
  } );

  ngOnInit(): void {
    this.user = this.authService.getUser();

    console.log(this.user);

    if (this.user) {
      this.id=this.user.id ;//
      this.username = this.user.username;
      this.email = this.user.email;

     

      console.log('userID',this.id);//
      console.log('Username:', this.username);
      console.log('Email:', this.email);
      console.log('LocalStorage:', localStorage.getItem('authUser'));
      
    } else {
      console.error("User not found in local storage.");
    }
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  onSubmit() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      
      // Ensure formValue fields are defined and handle null or undefined
      const phone = formValue.phone ?? '';
      const country = formValue.country ?? '';
     

      // Construct the expense data object
      const moreinfo = {
      
        country,
        phone

      };
  
      console.log('added info:', moreinfo);
  
      this.authService.addinfo(moreinfo).subscribe({
        next: (response) => {
          console.log('Server response:', response);

          
        
        },
        error: (error) => {
          console.error('Error adding information:', error);
          
        }
      });
    }
    
    
  }

  
}
