import { HttpClient, HttpParams } from '@angular/common/http';
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

  getCoursesEnrolledByStudent(studentId: string): Observable<ICourse[]> {
    const params = new HttpParams().set('studentId', studentId);
    return this.httpClient.get<ICourse[]>(`${this.URL}/api/Courses/GetCoursesEnrolledByStudent`, { params });
  }

  checkEnrollment(courseId: number, studentId: string): Observable<boolean> {
    const params = new HttpParams().set('studentId', studentId).set('courseId', courseId);
    return this.httpClient.get<boolean>(
      `${this.URL}/api/Courses/checkenrollment`,
      { params }
    );
  }

  courseEnroll(studentCourse: any): Observable<ICourse> {
    return this.httpClient.post<ICourse>(`${this.URL}/api/Courses/enroll`, studentCourse);
  }
}
