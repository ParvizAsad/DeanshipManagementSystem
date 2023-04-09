import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../../models/Room.models';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/rooms/";

  getAllRooms(): Observable<any[]> {
    return this.http.get<Room[]>(this.path)
  }

  getAllActiveRooms(): Observable<any[]> {
    return this.http.get<Room[]>(this.path + "activeRoom")
  }

  getAllPassiveRooms(): Observable<any[]> {
    return this.http.get<Room[]>(this.path + "passivRoom")
  }

  getById(id: number): Observable<Room> {
    return this.http.get<Room>(this.path + id)
  }

  createRooms(room: Room): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(room);
    console.log(body)
    return this.http.post<Room>(this.path, body, { headers });
  }

  updateRooms(room: Room, id: number): Observable<any> {
    return this.http.put<Room>(this.path + id, room)
  }

  deleteRooms(id: number): Observable<any> {
    return this.http.delete<Room>(this.path + id)
  }
}
