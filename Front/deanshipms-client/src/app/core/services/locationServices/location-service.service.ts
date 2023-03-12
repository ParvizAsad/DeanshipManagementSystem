import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Location } from '../../models/Location';
import { Observable } from 'rxjs';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {
//locations[]:Location;
  constructor(private http:HttpClient) { }
 path:string="http://localhost:8082/locations/";



getAllLocations(): Observable<any[]> {
  return this.http.get<Location[]>(this.path)
}

getById(id:number):Observable<Location>{
return this.http.get<Location>(this.path + id)
}

 addLocation(location:Location): Observable<any> {
     const headers = { 'content-type': 'application/json'}  
     const body=JSON.stringify(location);
    //console.log(body)
    return this.http.post<Location>(this.path, body,{'headers':headers})
  
  }

  updateLocation(location:Location, id:number):Observable<any>{
    return this.http.put<Location>(this.path + id, location)
  }

  deleteLocation(id:number):Observable<any>{
    return this.http.delete<Location>(this.path+id)
  }


}
