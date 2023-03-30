import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';
import { Major } from '../../models/Major.models';

@Injectable({
  providedIn: 'root'
})
export class MajorServiceService {
  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/majors/";

  getAllMajors(): Observable<any[]> {
    return this.http.get<Major[]>(this.path)
  }

  getAllPassivMajor(): Observable<any[]> {
    return this.http.get<Major[]>(this.path + "passivMajor")
  }
  getAllActiveMajor(): Observable<any[]> {
    return this.http.get<Major[]>(this.path + "activeMajor")
  }
  getById(id: number): Observable<Major> {
    return this.http.get<Major>(this.path + id)
  }

  createMajor(major: Major): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(major);
    console.log(body)
    return this.http.post<Major>(this.path, body, { headers });
  }

  updateMajor(major: Major, id: number): Observable<any> {
    console.log(major)
    return this.http.put<Major>(this.path + id, major)
  }

  deleteMajor(id: number): Observable<any> {
    return this.http.delete<Major>(this.path + id)
  }
}
