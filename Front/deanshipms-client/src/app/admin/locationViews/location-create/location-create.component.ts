import { Component, OnInit } from '@angular/core';
import { LocationServiceService } from 'src/app/core/services/locationServices/location-service.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { Location } from 'src/app/core/models/Location.models';
@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.scss']
})
export class LocationCreateComponent implements OnInit {
  title = 'httpGet Example';
  locations: Location[] = [];
  location: Location = new Location();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  constructor(
    private locationService: LocationServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshLocation();
  }

  refreshLocation() {
    this.locationService.getAllLocations().subscribe((data) => {
      console.log(data);
      this.locations = data;
    });
  }

  createLocation() {
    this.locationService.createLocation(this.location).subscribe(
      (data) => {
        console.log("data: " +data)
        console.log(this.location);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni location əlavə edildi!');
          this.refreshLocation();
          this.router.navigate(['/locations']);
        } else {
           this.alertService.warning(data);
          console.log(data)
        }
      },
      (error) => {
        console.log(error)
        this.alertService.error(error.error.text);
      }
    );
  }
}
