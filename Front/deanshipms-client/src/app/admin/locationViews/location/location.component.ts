import { Component, OnInit } from '@angular/core';
import { LocationServiceService } from 'src/app/core/services/locationServices/location-service.service';
import { Location } from 'src/app/core/models/Location';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit{
  title = 'httpGet Example';
  locations:Location[]=[];
  location!:Location;
  constructor(private locationService:LocationServiceService) {}

  ngOnInit() {
    this.refreshLocation()
  }

  refreshLocation() {
    this.locationService.getAllLocations()
      .subscribe(data => {
        console.log(data)
        this.locations=data;
      })      
  }

 

}
