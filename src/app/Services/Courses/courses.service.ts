import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from 'src/app/Model/icourse';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

  getAllCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`${this.URL}/api/Courses`);
  }

  getCourseById(courseId: number): Observable<ICourse> {
    return this.httpClient.get<ICourse>(`${this.URL}/api/Courses/${courseId}`);
  }

  deleteCourseById(courseId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/api/Courses/${courseId}`);
  }

  addCourse(courseData: ICourse): Observable<ICourse> {
    return this.httpClient.post<ICourse>(`${this.URL}/api/Courses`, courseData);
  }

  editCourse(courseId: number, updatedCourse: ICourse): Observable<void> {
    return this.httpClient.put<void>(`${this.URL}/api/Courses/${courseId}`, updatedCourse);
  }
}
