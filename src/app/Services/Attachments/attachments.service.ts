import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAttachment } from 'src/app/Model/icourse';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {
  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

  getAllAttachments(courseId: number, lectureId: number): Observable<IAttachment[]> {
    return this.httpClient.get<IAttachment[]>(`${this.URL}/api/courses/${courseId}/lectures/${lectureId}/attachments`);
  }

  getAttachmentById(courseId: number, lectureId: number, attachmentId: number): Observable<IAttachment> {
    return this.httpClient.get<IAttachment>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/attachments/${attachmentId}`);
  }

  deleteAttachmentById(courseId: number, lectureId: number, attachmentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/attachments/${attachmentId}`);
  }

  addAttachment(courseId: number, lectureId: number, LectureData: any): Observable<IAttachment> {
    return this.httpClient.post<IAttachment>(`${this.URL}/api/courses/${courseId}/lectures/${lectureId}/attachments`, LectureData);
  }

  editAttachment(courseId: number, lectureId: number, updatedLecture: any, attachmentId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/attachments/${attachmentId}`, updatedLecture);
  }
}
