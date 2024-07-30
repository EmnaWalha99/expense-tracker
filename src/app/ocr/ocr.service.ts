import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private baseUrl = 'http://localhost:3001';

  constructor(private httpClient: HttpClient) {}

  uploadReceipt(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/receipts`, formData);
  }
}
