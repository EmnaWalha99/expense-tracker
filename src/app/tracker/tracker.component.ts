import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseService } from '../expense/expense.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, NgFor, CommonModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {
  expenseService = inject(ExpenseService);
  totalExpenses: number = 0;
  monthlyExpenses: any[] = [];
  weeklyExpenses: any[] = [];
  monthlyCategoryExpenses: any[] = [];
  weeklyCategoryExpenses: any[] = [];
  currentMonth: Date = new Date();
  
  

  ngOnInit(): void {
    

    this.fetchTotalExpenses();
    this.fetchMonthlyExpenses();
    this.fetchWeeklyExpenses();
    this.fetchMonthlyCategoryExpenses();
    this.fetchWeeklyCategoryExpenses();
    
   

  }

  fetchTotalExpenses(): void {
    this.expenseService.getTotalExpenses().subscribe({
      next: (data) => {
        this.totalExpenses = data.totalExpenses;
      },
      error: (err) => {
        console.error('Error fetching total expenses:', err);
      }
    });
  }


  fetchMonthlyExpenses(): void {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
    this.expenseService.getMonthlyExpenses().subscribe({
      next: (data) => {
        this.monthlyExpenses =data;
        console.log("monthly expenses",this.monthlyExpenses);
      },
      error: (err) => {
        console.error('Error fetching monthly expenses:', err);
      }
    });
  }

  fetchWeeklyExpenses(): void {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
    this.expenseService.getWeeklyExpenses().subscribe({
      next: (data) => {
        this.weeklyExpenses = data;
        console.log("weekly expenses",data);

      },
      error: (err) => {
        console.error('Error fetching weekly expenses:', err);
      }
    });
  }

  fetchMonthlyCategoryExpenses(): void {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
    this.expenseService.getMonthlyCategoryExpenses().subscribe({
      next: (data) => {
        this.monthlyCategoryExpenses = data;
        console.log("monthly expense of each category",data);

      },
      error: (err) => {
        console.error('Error fetching monthly category expenses:', err);
      }
    });
  }

  fetchWeeklyCategoryExpenses(): void {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
    this.expenseService.getWeeklyCategoryExpenses().subscribe({
      next: (data) => {
        this.weeklyCategoryExpenses = data;
        console.log("weekly expenses of each category",data);

      },
      error: (err) => {
        console.error('Error fetching weekly category expenses:', err);
      }
    });
  }
 

}
