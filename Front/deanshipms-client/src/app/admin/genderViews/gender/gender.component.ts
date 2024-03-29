import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/core/models/Gender.models';
import { GenderServiceService } from 'src/app/core/services/genderServices/gender-service.service'

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit {
  title = 'httpGet Example';
  genders: Gender[] = [];
  gender!: Gender;
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  loading: boolean = true;
  errorText: string = "";
  constructor(private genderServices: GenderServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshGender()
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshGender() {
    this.genderServices.getAllGenders()
      .subscribe(data => {
        console.log(data)
        this.loading = false
        this.genders = data;
      },
        (error) => {
          this.loading = false
          console.log(error)
          this.addError(error)
        })
  }
  onItemChange(value: any) {
    if (value === 'Active') {
      this.genderServices.getAllActiveGender()
        .subscribe((data) => {
          this.genders = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          }
        )
    }
    else if (value === 'Passiv') {
      this.genderServices.getAllPassivGender().subscribe(
        (data) => {
          this.loading = false
          this.genders = data;
        },
        (error) => {
          this.loading = false
          this.addError(error)
        })
    }
    else if (value === 'All') {
      this.genderServices.getAllGenders().subscribe(
        data => {
          console.log(data)
          this.loading = false
          this.genders = data;
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
        this.genderServices.deleteGender(id).subscribe(
          (data) => {
            console.log(data)
            if (data === this.notfound) {
              console.log('notF');
              this.alertService.error('Element Tapılmadı');
            } else if (data === this.ok) {
              console.log('ok');
              this.alertService.success('Uğurlu əməliyyat!');
              this.onItemChange('All');
              this.router.navigate(['/genders']);
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
