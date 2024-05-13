import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from 'src/app/Model/itransaction';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

  getWalletBalance(studentId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.URL}/GetWalletBalance?ownerId=${studentId}`);
  }

  getStudentTransactions(studentId: string): Observable<ITransaction> {
    return this.httpClient.get<ITransaction>(`${this.URL}/GetStudentTransactions?StudId=${studentId}`);
  }

  getIFrameForOnlineCardPayment(paymentData: any): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/GetIFrameForOnlineCardPayment`, { params: paymentData });
  }

  getURLForMobileWalletPayment(paymentData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}/GetURLForMobileWalletPayment`, null, { params: paymentData });
  }

  getReferenceNumberForKioskPayment(paymentData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}/GetReferenceNumberForKioskPayment`, null, { params: paymentData });
  }

  consumeCoupon(CouponData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}/api/Coupon/consume`, null, { params: CouponData });
  }

  purchaseCourse(purchaseData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.URL}/PurchaseCourse`, null, { params: purchaseData });
  }
}
