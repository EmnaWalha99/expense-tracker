import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  authService = inject(AuthService);
  router =inject(Router);

  public signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword :new FormControl('', [Validators.required])
  } );
   
  passwordsMatch(group: FormGroup)
  {

    const password=group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };
 
  public onSubmit() {
      if (this.signupForm.valid) {
        const formData = this.signupForm.value;
        console.log('Form Data:', formData);
    
        this.authService.signup(formData).subscribe({
          next: (data: any) => {
            console.log('Signup Response:', data);
            this.router.navigate(['/login']);
            alert('You Registred Succesffully ');
          },
          error: (err) => {
            console.error('Signup Error:', err);
            
          }
        });
      } else {
        console.log('Form is invalid');
      }
    }
    

  
  
}
