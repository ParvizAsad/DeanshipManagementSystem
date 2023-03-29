import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../../models/Group.models';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/groups/";

  getAllGroups(): Observable<any[]> {
    return this.http.get<Group[]>(this.path)
  }

  getAllActiveGroups(): Observable<any[]> {
    return this.http.get<Group[]>(this.path + "activeGroup")
  }

  getAllPassiveGroups(): Observable<any[]> {
    return this.http.get<Group[]>(this.path + "passivGroup")
  }

  getById(id: number): Observable<Group> {
    return this.http.get<Group>(this.path + id)
  }

  createGroups(group: Group): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(group);
    console.log(body)
    return this.http.post<Group>(this.path, body, { headers });
  }

  updateGroups(group: Group, id: number): Observable<any> {
    return this.http.put<Group>(this.path + id, group)
  }

  deleteGroups(id: number): Observable<any> {
    return this.http.delete<Group>(this.path + id)
  }

}
