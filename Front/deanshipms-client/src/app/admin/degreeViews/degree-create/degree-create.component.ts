import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { DegreeServiceService } from 'src/app/core/services/degreeService/degree-service.service';
import { Degree } from 'src/app/core/models/Degree.models';

@Component({
  selector: 'app-degree-create',
  templateUrl: './degree-create.component.html',
  styleUrls: ['./degree-create.component.scss']
})
export class DegreeCreateComponent implements OnInit {
  title = 'httpGet Example';
  degrees: Degree[] = [];
  degree: Degree = new Degree();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private degreeService: DegreeServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshDegree();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshDegree() {
    this.degreeService.getAllDegrees().subscribe((data) => {
      console.log(data);
      this.degrees = data;
    },
      (error) => {
        this.addError(error)
      });
  }

  createDegree() {
    this.degreeService.createDegrees(this.degree).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.degree);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni degree əlavə edildi!');
          this.refreshDegree();
          this.router.navigate(['/degrees']);
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
