import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVideo } from '../../Model/icourse';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

  getAllVideos(courseId: number, lectureId: number): Observable<IVideo[]> {
    return this.httpClient.get<IVideo[]>(`${this.URL}/api/courses/${courseId}/lectures/${lectureId}/videos`);
  }

  getVideoById(courseId: number, lectureId: number, videoId: number): Observable<IVideo> {
    return this.httpClient.get<IVideo>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/videos/${videoId}`);
  }

  deleteVideoById(courseId: number, lectureId: number, videoId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/videos/${videoId}`);
  }

  addVideo(courseId: number, lectureId: number, VideoData: any): Observable<IVideo> {
    return this.httpClient.post<IVideo>(`${this.URL}/api/courses/${courseId}/lectures/${lectureId}/videos`, VideoData);
  }

  editVideo(courseId: number, lectureId: number, updatedLecture: any, videoId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/videos/${videoId}`, updatedLecture);
  }
}
