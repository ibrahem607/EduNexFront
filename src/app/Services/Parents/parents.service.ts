import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentsService {
  URL = 'http://localhost:5293';

  constructor(private httpClient: HttpClient) { }

  getParents(nationalId: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/api/Parents`, { params: { nationalId } });
  }
}
