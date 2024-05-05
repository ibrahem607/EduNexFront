import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl: string = 'http://localhost:5293';
  TeacherAbout: string = '';

  constructor(private httpClient:HttpClient) { }

 

  saveTeacherAbout(teacherId: string, aboutTeacher: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.baseUrl}/api/Teacher/teacherInfo/${teacherId}`, aboutTeacher, { headers });
  }
  
  // saveTeacherAccountNote(teacherId: string, accountNote: any): Observable<any> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.httpClient.put(`${this.baseUrl}/api/Teacher/TeacherAccountNote/${teacherId}`, accountNote, { headers });
  // }

  saveTeacherAccountNote(teacherId: string, accountNote: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.baseUrl}/api/Teacher/TeacherAccountNote/${teacherId}`, accountNote, { headers });
  }
  
  getAllTeacherPending():Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/teachers/Pending`)
  }

  ApproveTeacherProfile(id: string): Observable<any> {
    const url = `${this.baseUrl}/teachers/approve/${id}`;
    console.log('URL:', url); 
    return this.httpClient.put(url, {});
  }
  
  RejectTeacherProfile(id:string):Observable<any>
  {
    return this.httpClient.put(`${this.baseUrl}/teachers/reject/${id}`,{});
  }
  
  getTeacherById(id:any):Observable<any>
  {  
    return this.httpClient.get(`${this.baseUrl}/teacher/${id}`).pipe(map(response =>{
      console.log(response);
      return response}))
}
  
  
  getTeacherAbout():string
  {
    return this.TeacherAbout;
  }


  updateTeacherProfile(id:string,data:any): Observable<any> {
    const url = `${this.baseUrl}/api/Teacher/${id}`;
    console.log(`${url} and Data: ${data}`)
    return this.httpClient.put(url, data);
  }
}
