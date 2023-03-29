import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import {  FormsModule,
  FormGroup,
  FormControl } from '@angular/forms';
import { Gender } from 'src/app/core/models/Gender.models';
import { GenderServiceService } from 'src/app/core/services/genderServices/gender-service.service';
@Component({
  selector: 'app-gender-update',
  templateUrl: './gender-update.component.html',
  styleUrls: ['./gender-update.component.scss']
})
export class GenderUpdateComponent implements OnInit {
  genders: Gender[] = [];
  gender:Gender =new Gender();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private genderService: GenderServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params =>  this.id = Number(params.get('id'))
    );
    this.getbyId(this.id);
    this.refreshGender();
  }
  addError(error:any){
    this.errorText = error.message;
  }
   refreshGender() {
    this.genderService.getAllGenders().subscribe((data) => {
      this.genders = data;
    },
    (error) => {
      console.log(error)
      this.addError(error)
    });
  }

getbyId(id: number ){
this.genderService.getById(id).subscribe(
  (  data)=>{
    this.gender=data;
  },
  (error) => {
    console.log(error)
    this.addError(error)
  }
)
}

updateGender(f:NgForm){
this.genderService.updateGender(f.value.name,this.id).subscribe(
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
      this.alertService.success('Gender yeniləndi!');
      this.refreshGender();
      this.router.navigate(['/genders']);
    } else {
      console.log(data)
      this.alertService.warning("Bilinməyən problem baş verdi detallarına console hissədən baxın");
    }
  },
  (error) => {
    console.log(error)
    console.log(error.status)
    this.alertService.error("Error code: "+error.status);
  }
)} 
}
