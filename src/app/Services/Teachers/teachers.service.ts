import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

  getAllTeachers(): Observable<any> {
    return this.httpClient.get(`${this.URL}/teachers`);
  }

  getTeacherById(teacherId: string): Observable<any> {
    return this.httpClient.get(`${this.URL}/teacher/${teacherId}`);
  }
}
