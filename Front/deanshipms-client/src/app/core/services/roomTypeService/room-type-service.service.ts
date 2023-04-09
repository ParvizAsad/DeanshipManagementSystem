import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../../models/Room.models';
import { RoomType } from '../../models/RoomType.models';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeServiceService {

  constructor(private http: HttpClient) { }
  path: string = "http://localhost:8082/roomTypes/";

  getAllRoomTypes(): Observable<any[]> {
    return this.http.get<RoomType[]>(this.path)
  }

  getAllActiveRoomTypes(): Observable<any[]> {
    return this.http.get<RoomType[]>(this.path + "activeRoomType")
  }

  getAllPassiveRoomTypes(): Observable<any[]> {
    return this.http.get<RoomType[]>(this.path + "passivRoomType")
  }

  getById(id: number): Observable<RoomType> {
    return this.http.get<RoomType>(this.path + id)
  }

  createRoomTypes(roomType: RoomType): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(roomType);
    console.log(body)
    return this.http.post<RoomType>(this.path, body, { headers });
  }

  updateRoomTypes(roomType: RoomType, id: number): Observable<any> {
    return this.http.put<RoomType>(this.path + id, roomType)
  }

  deleteRoomTypes(id: number): Observable<any> {
    return this.http.delete<RoomType>(this.path + id)
  }

}
