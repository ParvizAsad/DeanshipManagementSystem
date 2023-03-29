import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import {  FormsModule,
  FormGroup,
  FormControl } from '@angular/forms';
import { Department } from 'src/app/core/models/Department.models';
import { DepartmentService } from 'src/app/core/services/department service/department.service';

@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.scss']
})
export class DepartmentUpdateComponent implements OnInit {
  departments: Department[] = [];
  department:Department =new Department();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private departmentService: DepartmentService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params =>  this.id = Number(params.get('id'))
    );
    this.getbyId(this.id);
    this.refreshDepartment();
  }
  addError(error:any){
    this.errorText = error.message;
  }
   refreshDepartment() {
    this.departmentService.getAllDepartment().subscribe((data) => {
      this.departments = data;
    },
    (error) => {
      console.log(error)
      this.addError(error)
    });
  }

getbyId(id: number ){
this.departmentService.getById(id).subscribe(
  (  data)=>{
    this.department=data;
  },
  (error) => {
    console.log(error)
    this.addError(error)
  }
)
}

updateDepartment(f:NgForm){
this.departmentService.updateDepartment(f.value.name,this.id).subscribe(
  (data) => {
    console.log(data);
    console.log(f);
    console.log(f.value.name);
    if (data == this.badreq) {
      console.log('bad');
      this.alertService.error('Fərqli adla yenidən cəhd edin!');
    } else if (data === this.notfound) {
      console.log('notF');
      this.alertService.error('Element Tapılmadı');
    } else if (data === this.ok) {
      console.log('ok');
      this.alertService.success('Department yeniləndi!');
      this.refreshDepartment();
      this.router.navigate(['/department']);
    } else {
      console.log(data)
      this.alertService.warning("Bilinməyən problem baş verdi detallarına console hissədən baxın");
    }
  },
  (error) => {
    console.log(error)
    console.log(error.status)
    this.alertService.error("Error code: "+error.status);
      console.log(error)
      this.addError(error)
  }
)} 
}
