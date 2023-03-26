import { Component, OnInit } from '@angular/core';
import { Gender } from 'src/app/core/models/Gender.models';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderServiceService } from 'src/app/core/services/genderServices/gender-service.service'

let value = document.getElementById("radio");
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

  constructor(private genderServices: GenderServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshGender()
  }
  refreshGender() {
    this.genderServices.getAllGenders()
      .subscribe(data => {
        console.log(data)
        this.genders = data;
      })
  }
  onItemChange(value: any) {
    if (value === 'Active') {
      this.genderServices.getAllActiveGender()
        .subscribe((data) => {
          this.genders = data;
        })
    }
    else if(value === 'Passiv') {
      this.genderServices.getAllPassivGender()
        .subscribe((data) => {
          this.genders = data;
        })
    }
    else if( value === 'All') {
      this.genderServices.getAllGenders()
        .subscribe(data => {
          console.log(data)
          this.genders = data;
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
              this.router.navigate(['/location']);
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
