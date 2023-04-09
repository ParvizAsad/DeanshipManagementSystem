import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../../models/Position.models';

@Injectable({
  providedIn: 'root'
})
export class PositionServiceService {

  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/positions/";

  getAllPositions(): Observable<any[]> {
    return this.http.get<Position[]>(this.path)
  }

  getAllActivePositions(): Observable<any[]> {
    return this.http.get<Position[]>(this.path + "activePosition")
  }

  getAllPassivePositions(): Observable<any[]> {
    return this.http.get<Position[]>(this.path + "passivPosition")
  }

  getById(id: number): Observable<Position> {
    return this.http.get<Position>(this.path + id)
  }

  createPositions(position: Position): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(position);
    console.log(body)
    return this.http.post<Position>(this.path, body, { headers });
  }

  updatePositions(position: Position, id: number): Observable<any> {
    return this.http.put<Position>(this.path + id, position)
  }

  deletePositions(id: number): Observable<any> {
    return this.http.delete<Position>(this.path + id)
  }

}
