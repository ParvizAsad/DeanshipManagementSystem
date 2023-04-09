import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Degree } from 'src/app/core/models/Degree.models';
import { DegreeServiceService } from 'src/app/core/services/degreeService/degree-service.service';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit {
  title = 'httpGet Example';
  degrees: Degree[] = [];
  degree!: Degree;
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  loading: boolean = true;
  errorText: string = "";
  constructor(private degreeService: DegreeServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.loading)
    this.refreshDegree()
  }

  addError(error: any) {
    this.errorText = error.message;
  }

  refreshDegree() {
    this.loading = true
    this.degreeService.getAllDegrees()
      .subscribe(data => {
        console.log(data)
        this.loading = false
        this.degrees = data;
      },
        (error) => {
          this.loading = false
          console.log(error)
          this.addError(error)
        }
      )
  }

  onItemChange(value: any) {
    this.loading = true
    if (value === 'Active') {
      this.degreeService.getAllActiveDegrees()
        .subscribe((data) => {
          this.loading = false
          this.degrees = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          }
        )
    }
    else if (value === 'Passiv') {
      this.degreeService.getAllPassiveDegrees()
        .subscribe((data) => {
          this.loading = false
          this.degrees = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
    else if (value === 'All') {
      this.degreeService.getAllDegrees()
        .subscribe(data => {
          console.log(data)
          this.loading = false
          this.degrees = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
  }

  changeActivate(id: number, situation: boolean) {
    let showSituation: String = !situation ? "Aktiv" : "Passiv";
    this.alertService.confirm("Aktiv/Passiv", "Bu elementin vəziyyətini dəyişmək istədiyinizdən əminsiniz? \n Cari vəziyyəti: "
      + showSituation,
      () => {
        this.degreeService.deleteDegrees(id).subscribe(
          (data) => {
            console.log(data)
            this.refreshDegree();
            if (data === this.notfound) {
              this.alertService.error('Element Tapılmadı');
            } else if (data === this.ok) {
              this.alertService.success('Uğurlu əməliyyat!');
              this.router.navigate(['/degrees']);
            } else {
              this.alertService.warning("Bilinməyən problem baş verdi detallarına console hissədən baxın");
            }
          },
          (error) => {
            console.log(error)
            this.alertService.error("Error code: " + error.status);
          }
        )
      },
      () => {
        this.alertService.warning("Cancel");
      }
    );
  }
}
