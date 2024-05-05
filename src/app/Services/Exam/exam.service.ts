import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from 'src/app/Model/iexam';
import { IExamResult } from 'src/app/Model/iexam-result';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

  // exam
  getAllExams(): Observable<IExam[]> {
    return this.httpClient.get<IExam[]>(`${this.URL}/api/Exams`);
  }

  getExamById(examId: number): Observable<IExam> {
    return this.httpClient.get<IExam>(`${this.URL}/api/Exams/${examId}`);
  }

  deleteExamById(examId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/api/Exams/${examId}`);
  }

  addExam(examData: any): Observable<IExam> {
    return this.httpClient.post<IExam>(`${this.URL}/api/Exams`, examData);
  }

  editExam(examId: number, updatedExam: IExam): Observable<void> {
    return this.httpClient.put<void>(`${this.URL}/api/Exams/${examId}`, updatedExam);
  }

  startExam(examId: number, student: any): Observable<IExam> {
    return this.httpClient.post<IExam>(`${this.URL}/api/Exams/${examId}/start`, student);
  }

  submitExam(examId: number, submittedExam: any): Observable<IExam> {
    return this.httpClient.post<IExam>(`${this.URL}/api/Exams/${examId}/submit`, submittedExam);
  }

  getInfoExam(examId: number, student: any): Observable<IExam> {
    return this.httpClient.get<IExam>(`${this.URL}/api/Exams/${examId}/getinfo/${student}`);
  }

  // examResult
  getExamResult(examId: number, student: any): Observable<IExamResult> {
    return this.httpClient.get<IExamResult>(`${this.URL}/api/Exams/${examId}/result/${student}`);
  }
}
