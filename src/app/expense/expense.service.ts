import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor() { };
  httpClient = inject(HttpClient);
  baseUrl ='http://localhost:3001';


  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/categories`);
  }

  addExpense(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/expenses`, data);
  }
}
