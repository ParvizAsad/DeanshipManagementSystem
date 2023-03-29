import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../models/Department.models';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/department/";

  getAllDepartment(): Observable<any[]> {
    return this.http.get<Department[]>(this.path)
  }

  getAllActiveDepartment(): Observable<any[]> {
    return this.http.get<Department[]>(this.path + "activeDepartment")
  }

  getAllPassiveDepartment(): Observable<any[]> {
    return this.http.get<Department[]>(this.path + "passivDepartment")
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(this.path + id)
  }

  createDepartment(department: Department): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(department);
    console.log(body)
    return this.http.post<Department>(this.path, body, { headers });
  }

  updateDepartment(department: Department, id: number): Observable<any> {
    console.log(department)
    return this.http.put<Department>(this.path + id, department)
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<Department>(this.path + id)
  }
}