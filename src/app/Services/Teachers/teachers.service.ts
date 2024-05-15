import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient) { }

  getAllTeachers(): Observable<any> {
    return this.httpClient.get(`${this.URL}/teachers`);
  }

  getTeacherById(teacherId: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/teacher/${teacherId}`);
  }
}
