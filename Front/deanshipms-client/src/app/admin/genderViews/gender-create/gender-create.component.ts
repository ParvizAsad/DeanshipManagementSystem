import { Component, OnInit } from '@angular/core';
import { GenderServiceService } from 'src/app/core/services/genderServices/gender-service.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { Gender } from 'src/app/core/models/Gender.models';
@Component({
  selector: 'app-gender-create',
  templateUrl: './gender-create.component.html',
  styleUrls: ['./gender-create.component.scss']
})
export class GenderCreateComponent implements OnInit {
  title = 'httpGet Example';
  genders: Gender[] = [];
  gender: Gender = new Gender();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private genderService: GenderServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshGender();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshGender() {
    this.genderService.getAllGenders().subscribe((data) => {
      console.log(data);
      this.genders = data;
    },
      (error) => {
        this.addError(error)
      });
  }

  createGender() {
    this.genderService.createGender(this.gender).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.gender);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni gender əlavə edildi!');
          this.refreshGender();
          this.router.navigate(['/genders']);
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
