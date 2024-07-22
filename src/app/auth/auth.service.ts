import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  httpClient =inject(HttpClient);
  baseUrl='http://localhost:3000';
  signup(data: any){
    return this.httpClient.post(`${this.baseUrl}/signup`,data);

  }
  login(data: any){
    return this.httpClient.post(`${this.baseUrl}/login`,data)
    .pipe(tap((result) =>{
      localStorage.setItem('autherUser',JSON.stringify(result));
    }
    ));
  }
  logout(){
    localStorage.removeItem('authUser');
  }
  isLoggedIn(){
    
    return localStorage.getItem('authUser') !== null ;
  }
}
