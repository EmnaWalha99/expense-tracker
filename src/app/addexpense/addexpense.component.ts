import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
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
    router=inject(Router);
    categories: any[] = [];
    todayDate: string;

  constructor() {
  this.todayDate = new Date().toISOString().split('T')[0];
  }

  
    public expenseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
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
        this.expenseService.addExpense(this.expenseForm.value).subscribe({
          next: (response) => {
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