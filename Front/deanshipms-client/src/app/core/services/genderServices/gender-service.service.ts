import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';
import { Gender } from '../../models/Gender.models';

@Injectable({
  providedIn: 'root'
})
export class GenderServiceService {

  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/genders/";

  getAllGenders(): Observable<any[]> {
    return this.http.get<Gender[]>(this.path)
  }

  getAllPassivGender(): Observable<any[]> {
    return this.http.get<Gender[]>(this.path + "passivGender")
  }
  getAllActiveGender(): Observable<any[]> {
    return this.http.get<Gender[]>(this.path + "activeGender")
  }
  getById(id: number): Observable<Gender> {
    return this.http.get<Gender>(this.path + id)
  }

  createGender(gender: Gender): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(gender);
    console.log(body)
    return this.http.post<Gender>(this.path, body, { headers });
  }

  updateGender(gender: Gender, id: number): Observable<any> {
    console.log(gender)
    return this.http.put<Gender>(this.path + id, gender)
  }

  deleteGender(id: number): Observable<any> {
    return this.http.delete<Gender>(this.path + id)
  }
}
