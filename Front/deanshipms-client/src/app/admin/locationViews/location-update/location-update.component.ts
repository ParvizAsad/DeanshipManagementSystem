import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { LocationServiceService } from 'src/app/core/services/locationServices/location-service.service';
import { Location } from 'src/app/core/models/Location';
import { NgForm } from '@angular/forms';
import {  FormsModule,
  FormGroup,
  FormControl } from '@angular/forms';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.scss']
})
export class LocationUpdateComponent implements OnInit {
  locations: Location[] = [];
  location!:Location;
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  constructor(
    private locationService: LocationServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params =>  this.id = Number(params.get('id'))
    );
    this.getbyId(this.id);
    this.refreshLocation();
  }

   refreshLocation() {
    this.locationService.getAllLocations().subscribe((data) => {
      this.locations = data;
    });
  }

getbyId(id: number ){
this.locationService.getById(id).subscribe(
  (  data)=>{
    this.location=data;
  }
)
}

updateLocation(f:NgForm){
  console.log(f.value);
this.locationService.updateLocation(f.value,this.id).subscribe(
  (data) => {
    console.log(data);
    console.log(f.value);
    if (data == this.badreq) {
      console.log('bad');
      this.alertService.error('Bu adda elemt var!');
    } else if (data === this.notfound) {
      console.log('notF');
      this.alertService.error('Element Tapılmadı');
    } else if (data === this.ok) {
      console.log('ok');
      this.alertService.success('location yeniləndi!');
      this.refreshLocation();
      this.router.navigate(['/location']);
    } else {
      this.alertService.warning(data);
    }
  },
  (error) => {
    console.log(error.status)
    this.alertService.error("Error code: "+error.status);
  }
)
}

}
