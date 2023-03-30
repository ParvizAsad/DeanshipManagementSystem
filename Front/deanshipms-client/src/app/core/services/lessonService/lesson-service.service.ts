import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/Lesson.models';

@Injectable({
  providedIn: 'root'
})
export class LessonServiceService {
  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/lessons/";

  getAllLessons(): Observable<any[]> {
    return this.http.get<Lesson[]>(this.path)
  }

  getAllActiveLessons(): Observable<any[]> {
    return this.http.get<Lesson[]>(this.path + "activeLesson")
  }

  getAllPassiveLessons(): Observable<any[]> {
    return this.http.get<Lesson[]>(this.path + "passivLesson")
  }

  getById(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(this.path + id)
  }

  createLessons(lesson: Lesson): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(lesson);
    console.log(body)
    return this.http.post<Lesson>(this.path, body, { headers });
  }

  updateLesson(lesson: Lesson, id: number): Observable<any> {
    return this.http.put<Lesson>(this.path + id, lesson)
  }

  deleteLesson(id: number): Observable<any> {
    return this.http.delete<Lesson>(this.path + id)
  }

}
