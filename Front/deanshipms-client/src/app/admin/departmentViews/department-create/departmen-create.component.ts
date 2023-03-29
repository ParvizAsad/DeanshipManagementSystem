import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { DepartmentService } from 'src/app/core/services/department service/department.service';
import { Department } from 'src/app/core/models/Department.models';

@Component({
  selector: 'app-departmen-create',
  templateUrl: './departmen-create.component.html',
  styleUrls: ['./departmen-create.component.scss']
})
export class DepartmenCreateComponent implements OnInit {
  title = 'httpGet Example';
  departments: Department[] = [];
  department: Department = new Department();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private departmentService: DepartmentService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshDepartment();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshDepartment() {
    this.departmentService.getAllDepartment().subscribe((data) => {
      console.log(data);
      this.departments = data;
    },
      (error) => {
        this.addError(error)
      }
    );
  }

  createDepartment() {
    this.departmentService.createDepartment(this.department).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.department);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni gender əlavə edildi!');
          this.refreshDepartment();
          this.router.navigate(['/department']);
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
