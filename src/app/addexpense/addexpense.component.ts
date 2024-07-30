import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ExpenseService } from '../expense/expense.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-addexpense',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './addexpense.component.html',
  styleUrl: './addexpense.component.css'
})
export class AddexpenseComponent {

    expenseService=inject(ExpenseService);
    authService=inject(AuthService);
    router=inject(Router);
    categories: any[] = [];
    todayDate: string;

  constructor() {
  this.todayDate = new Date().toISOString().split('T')[0];
  }

  
    public expenseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount:new FormControl ('', [Validators.required]),//, Validators.pattern('^[0-9]*$')]],
      date: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
    });
    ngOnInit(): void {
      this.loadCategories();
    }
  
    loadCategories() {
      this.expenseService.getCategories().subscribe({
        next: (data: any[]) => {
          this.categories = data;
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        }
      });
    }
 
      onSubmit() {
        if (this.expenseForm.valid) {
          const formValue = this.expenseForm.value;
          
          // Ensure formValue fields are defined and handle null or undefined
          const name = formValue.name ?? '';
          const amount = parseFloat(formValue.amount ?? '0');
          const date = formValue.date ?? '';
          const categoryId = formValue.categoryId ? parseInt(formValue.categoryId, 10) : 0;
          const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;

          // Construct the expense data object
          const expenseData = {
            name,
            amount,
            date,
            categoryId,
            userId
            

          };
      
          console.log('Expense data:', expenseData); // Check data being sent
      
          this.expenseService.addExpense(expenseData).subscribe({
            next: (response) => {
              console.log('Server response:', response);

              alert('Expense added successfully!');
              this.expenseForm.reset();
            },
            error: (error) => {
              console.error('Error adding expense:', error);
              alert('Error adding expense');
            }
          });
        } else {
          alert('Please fill in all required fields');
        }
      }
      
  }
   
      