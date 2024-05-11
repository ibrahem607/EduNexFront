import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

  getWalletBalance(studentId:string): Observable<number> {
    return this.httpClient.get<number>(`${this.URL}/GetWalletBalance?ownerId=${studentId}`);
  }
}
