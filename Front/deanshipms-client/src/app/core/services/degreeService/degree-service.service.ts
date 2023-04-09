import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Degree } from '../../models/Degree.models';

@Injectable({
  providedIn: 'root'
})
export class DegreeServiceService {

  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/degree/";

  getAllDegrees(): Observable<any[]> {
    return this.http.get<Degree[]>(this.path)
  }

  getAllActiveDegrees(): Observable<any[]> {
    return this.http.get<Degree[]>(this.path + "activeDegree")
  }

  getAllPassiveDegrees(): Observable<any[]> {
    return this.http.get<Degree[]>(this.path + "passivDegree")
  }

  getById(id: number): Observable<Degree> {
    return this.http.get<Degree>(this.path + id)
  }

  createDegrees(degree: Degree): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(degree);
    console.log(body)
    return this.http.post<Degree>(this.path, body, { headers });
  }

  updateDegrees(degree: Degree, id: number): Observable<any> {
    return this.http.put<Degree>(this.path + id, degree)
  }

  deleteDegrees(id: number): Observable<any> {
    return this.http.delete<Degree>(this.path + id)
  }

}
