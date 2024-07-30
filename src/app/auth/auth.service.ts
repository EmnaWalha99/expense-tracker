import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  httpClient =inject(HttpClient);
  baseUrl='http://localhost:3002';
  //consistant key for local storage
  localStorageKey='authUser';
  signup(data: any){
    return this.httpClient.post(`${this.baseUrl}/signup`,data);
    

  }
  login(data: any) {
    
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .pipe(tap((result: any) => {
        localStorage.setItem('authUser', JSON.stringify(result.user));
        //localStorage.setItem('authUser',JSON.stringify.);
      }));
  }
  
  
  logout(){
    localStorage.removeItem('authUser');
  }
  isLoggedIn(){
    
    return localStorage.getItem('authUser') !== null ;
  }
  getUser() {
    const userJson = localStorage.getItem(this.localStorageKey);
    return userJson ? JSON.parse(userJson) : null;
  }
  addinfo(data :any){
    return this.httpClient.post(`${this.baseUrl}/addinfo`, data)

  }
  
  
  

}
