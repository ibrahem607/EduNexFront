import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from '../Model/iexam';
import { IExamResult } from '../Model/iexam-result';

@Injectable({
  providedIn: 'root'
})
export class DynamicDataService {

  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

  // exam
  getAllExams(): Observable<IExam[]> {
    return this.httpClient.get<IExam[]>("http://localhost:2000/exams");
  }

  getExamById(examId: number): Observable<IExam> {
    return this.httpClient.get<IExam>(`http://localhost:2000/exams/${examId}`);
  }

  deleteExamById(examId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:2000/exams/${examId}`);
  }

  addExam(courseData: IExam): Observable<IExam> {
    return this.httpClient.post<IExam>("http://localhost:2000/exams", courseData);
  }

  editExam(examId: number, updatedExam: IExam): Observable<void> {
    return this.httpClient.put<void>(`http://localhost:2000/exams/${examId}`, updatedExam);
  }


  // examResult
  getExamResult(): Observable<IExamResult> {
    return this.httpClient.get<IExamResult>("http://localhost:2000/examResult");
  }

}
