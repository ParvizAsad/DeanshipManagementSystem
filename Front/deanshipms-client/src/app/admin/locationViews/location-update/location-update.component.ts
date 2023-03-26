import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { LocationServiceService } from 'src/app/core/services/locationServices/location-service.service';

import { NgForm } from '@angular/forms';
import {  FormsModule,
  FormGroup,
  FormControl } from '@angular/forms';
import { Location } from 'src/app/core/models/Location.models';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.scss']
})
export class LocationUpdateComponent implements OnInit {
  locations: Location[] = [];
  location:Location =new Location();
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
this.locationService.updateLocation(f.value.name,this.id).subscribe(
  (data) => {
    console.log(data);
    console.log(f);
    console.log(f.value.name);
    if (data == this.badreq) {
      console.log('bad');
      this.alertService.error('Fərqli adla yenidən cəhd edin!');
    } else if (data === this.notfound) {
      console.log('notF');
      this.alertService.error('Element Tapılmadı');
    } else if (data === this.ok) {
      console.log('ok');
      this.alertService.success('location yeniləndi!');
      this.refreshLocation();
      this.router.navigate(['/locations']);
    } else {
      console.log(data)
      this.alertService.warning("Bilinməyən problem baş verdi detallarına console hissədən baxın");
    }
  },
  (error) => {
    console.log(error)
    console.log(error.status)
    this.alertService.error("Error code: "+error.status);
  }
)
}

}
