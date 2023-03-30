import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { MajorServiceService } from 'src/app/core/services/majorService/major-service.service';
import { Major } from 'src/app/core/models/Major.models';

@Component({
  selector: 'app-major-update',
  templateUrl: './major-update.component.html',
  styleUrls: ['./major-update.component.scss']
})
export class MajorUpdateComponent implements OnInit {
  majors: Major[] = [];
  major:Major =new Major();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private majorService: MajorServiceService,
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
    this.refreshMajor();
  }
  addError(error:any){
    this.errorText = error.message;
  }
   refreshMajor() {
    this.majorService.getAllMajors().subscribe((data) => {
      this.majors = data;
    },
    (error) => {
      console.log(error)
      this.addError(error)
    });
  }

getbyId(id: number ){
this.majorService.getById(id).subscribe(
  (  data)=>{
    this.major=data;
  },
  (error) => {
    console.log(error)
    this.addError(error)
  }
)
}

updateMajor(f:NgForm){
this.majorService.updateMajor(f.value.name,this.id).subscribe(
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
      this.alertService.success('Major yeniləndi!');
      this.refreshMajor();
      this.router.navigate(['/majors']);
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

