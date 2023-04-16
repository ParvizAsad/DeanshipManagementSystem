import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';
import { Person } from '../../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/persons/";

  getAllPersons(): Observable<any[]> {
    return this.http.get<Person[]>(this.path)
  }

  getAllPassivPerson(): Observable<any[]> {
    return this.http.get<Person[]>(this.path + "passivPerson")
  }
  getAllActivePerson(): Observable<any[]> {
    return this.http.get<Person[]>(this.path + "activePerson")
  }
  getById(id: number): Observable<Person> {
    return this.http.get<Person>(this.path + id)
  }

  createPerson(person: Person): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(person);
    console.log(body)
    return this.http.post<Person>(this.path, body, { headers });
  }

  updatePerson(person: Person, id: number): Observable<any> {
    console.log(person)
    return this.http.put<Person>(this.path + id, person)
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete<Person>(this.path + id)
  }
}
