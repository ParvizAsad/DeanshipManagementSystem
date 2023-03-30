import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Major } from 'src/app/core/models/Major.models';
import { MajorServiceService } from 'src/app/core/services/majorService/major-service.service';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.scss']
})
export class MajorComponent implements OnInit {
  title = 'httpGet Example';
  majors: Major[] = [];
  major!: Major;
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  loading: boolean = true;
  errorText: string = "";
  constructor(private majorServices: MajorServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshMajor()
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshMajor() {
    this.majorServices.getAllMajors()
      .subscribe(data => {
        console.log(data)
        this.loading = false
        this.majors = data;
      },
        (error) => {
          this.loading = false
          console.log(error)
          this.addError(error)
        })
  }
  onItemChange(value: any) {
    if (value === 'Active') {
      this.majorServices.getAllActiveMajor()
        .subscribe((data) => {
          this.majors = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          }
        )
    }
    else if (value === 'Passiv') {
      this.majorServices.getAllPassivMajor().subscribe(
        (data) => {
          this.loading = false
          this.majors = data;
        },
        (error) => {
          this.loading = false
          this.addError(error)
        })
    }
    else if (value === 'All') {
      this.majorServices.getAllMajors().subscribe(
        data => {
          console.log(data)
          this.loading = false
          this.majors = data;
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
        this.majorServices.deleteMajor(id).subscribe(
          (data) => {
            console.log(data)
            if (data === this.notfound) {
              console.log('notF');
              this.alertService.error('Element Tapılmadı');
            } else if (data === this.ok) {
              console.log('ok');
              this.alertService.success('Uğurlu əməliyyat!');
              this.onItemChange('All');
              this.router.navigate(['/majors']);
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
