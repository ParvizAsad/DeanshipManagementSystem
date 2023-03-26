import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';
import { Location } from '../../models/Location.models';
@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {
// location!:CreateLocation;
  constructor(private http:HttpClient) { }
 path:string="http://localhost:8082/locations/";

getAllLocations(): Observable<any[]> {
  return this.http.get<Location[]>(this.path)
}

getById(id:number):Observable<Location>{
return this.http.get<Location>(this.path + id)
}

  createLocation(location: Location): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(location);
    console.log(body)
    return this.http.post<Location>(this.path, body, { headers });
  }

  updateLocation(location:Location, id:number):Observable<any>{
    console.log(location)
    return this.http.put<Location>(this.path + id, location)
  }

  deleteLocation(id:number):Observable<any>{
    return this.http.delete<Location>(this.path+id)
  }

}
