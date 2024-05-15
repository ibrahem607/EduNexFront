import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentsService {
  // URL = environment.API_KEY;
  URL = process.env['API_KEY'];

  constructor(private httpClient: HttpClient) { }

  getParents(nationalId: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/api/Parents`, { params: { nationalId } });
  }
}
