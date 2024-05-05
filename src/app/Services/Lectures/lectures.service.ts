import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILecture } from 'src/app/Model/icourse';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {
  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

  getAllLectures(courseId: number): Observable<ILecture[]> {
    return this.httpClient.get<ILecture[]>(`${this.URL}/api/courses/${courseId}/lectures`);
  }

  getLectureById(courseId: number, lectureId: number): Observable<ILecture> {
    return this.httpClient.get<ILecture>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}`);
  }

  deleteLectureById(courseId: number, lectureId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}`);
  }

  addLecture(courseId: number, LectureData: ILecture): Observable<ILecture> {
    return this.httpClient.post<ILecture>(`${this.URL}/api/courses/${courseId}/lectures`, LectureData);
  }

  editLecture(courseId: number, lectureId: number, updatedLecture: ILecture): Observable<void> {
    return this.httpClient.put<void>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}`, updatedLecture);
  }
}
