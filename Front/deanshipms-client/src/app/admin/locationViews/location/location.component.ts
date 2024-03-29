import { Component, OnInit } from '@angular/core';
import { LocationServiceService } from 'src/app/core/services/locationServices/location-service.service';
import { Location } from 'src/app/core/models/Location.models';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  title = 'httpGet Example';
  locations: Location[] = [];
  location!: Location;
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  loading: boolean = true;
  errorText: string = "";
  constructor(private locationService: LocationServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshLocation()
    console.log(this.locations)
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshLocation() {
    this.locationService.getAllLocations()
      .subscribe(data => {
            console.log(data)
            this.loading = false
        this.locations = data;
      },
        (error) => {
          this.loading = false
          this.addError(error)
        })
  }

  onItemChange(value: any) {
    if (value === 'Active') {
      this.locationService.getAllActiveLocation()
        .subscribe((data) => {
          this.loading = false
          this.locations = data;

        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
    else if (value === 'Passiv') {
      this.locationService.getAllPassiveLocation()
        .subscribe((data) => {
          this.loading = false
          this.locations = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
    else if (value === 'All') {
      this.locationService.getAllLocations()
        .subscribe(data => {
          console.log(data)
          this.loading = false
          this.locations = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
  }

  changeActivate(id: number, situation: boolean) {
    this.alertService.confirm("Active/Passive", "Bu elementin vəziyyətini dəyişmək istədiyinizdən əminsiniz? Cari vəziyyəti: " + situation,
      () => {
        this.locationService.deleteLocation(id).subscribe(
          (data) => {
            console.log(data)
            if (data === this.notfound) {
              console.log('notF');
              this.alertService.error('Element Tapılmadı');
            } else if (data === this.ok) {
              console.log('ok');
              this.alertService.success('Uğurlu əməliyyat!');
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
            this.alertService.error("Error code: " + error.status);
          }
        )
      },
      () => {
        console.log("Cancel")
        this.alertService.warning("Cancel");
      }
    );
  }
}
