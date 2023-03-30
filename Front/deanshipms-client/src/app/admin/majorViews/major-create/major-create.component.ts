import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { Major } from 'src/app/core/models/Major.models';
import { MajorServiceService } from 'src/app/core/services/majorService/major-service.service';

@Component({
  selector: 'app-major-create',
  templateUrl: './major-create.component.html',
  styleUrls: ['./major-create.component.scss']
})
export class MajorCreateComponent implements OnInit {
  title = 'httpGet Example';
  majors: Major[] = [];
  major: Major = new Major();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private majorService: MajorServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshMajor();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshMajor() {
    this.majorService.getAllMajors().subscribe((data) => {
      console.log(data);
      this.majors = data;
    },
      (error) => {
        this.addError(error)
      });
  }

  createMajor() {
    this.majorService.createMajor(this.major).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.major);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni major əlavə edildi!');
          this.refreshMajor();
          this.router.navigate(['/majors']);
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
