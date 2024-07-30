import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { };
  httpClient = inject(HttpClient);
  baseUrl ='http://localhost:3002';


  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/categories`);
  }

  addExpense(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/expenses`, data);
  }
  
  getTotalExpenses(): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;


    if (!userId) {
      throw new Error('User ID not found in local storage');
    }

    return this.httpClient.get<any>(`${this.baseUrl}/total-expenses`, {
      params: { userId }
    });

  }

  getCategoryExpenses(): Observable<any>{
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;

    if(!userId) {
      throw new Error('User ID not found in local storage');
    }
    return this.httpClient.get<any>(`${this.baseUrl}/category-expenses`, {
      params: {userId}
    });
    
  }
  
  getMonthlyExpenses(): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
  
    if (!userId) {
      throw new Error('User ID not found in local storage');
    }
  
    return this.httpClient.get<any>(`${this.baseUrl}/monthly-expenses`, {
      params: { userId }
    });
  }
  
  getWeeklyExpenses(): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
  
    if (!userId) {
      throw new Error('User ID not found in local storage');
    }
  
    return this.httpClient.get<any>(`${this.baseUrl}/weekly-expenses`, {
      params: { userId }
    });
  }
  
  getMonthlyCategoryExpenses(): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
  
    if (!userId) {
      throw new Error('User ID not found in local storage');
    }
  
    return this.httpClient.get<any>(`${this.baseUrl}/monthly-category-expenses`, {
      params: { userId }
    });
  }
  
  getWeeklyCategoryExpenses(): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').id;
  
    if (!userId) {
      throw new Error('User ID not found in local storage');
    }
  
    return this.httpClient.get<any>(`${this.baseUrl}/weekly-category-expenses`, {
      params: { userId }
    });
  }
  

}



