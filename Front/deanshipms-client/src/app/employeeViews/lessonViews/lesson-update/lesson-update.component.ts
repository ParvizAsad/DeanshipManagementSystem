import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import {  FormsModule,
  FormGroup,
  FormControl } from '@angular/forms';
import { Lesson } from 'src/app/core/models/Lesson.models';
import { LessonServiceService } from 'src/app/core/services/lessonService/lesson-service.service';

@Component({
  selector: 'app-lesson-update',
  templateUrl: './lesson-update.component.html',
  styleUrls: ['./lesson-update.component.scss']
})
export class LessonUpdateComponent implements OnInit {
  lessons: Lesson[] = [];
  lesson:Lesson =new Lesson();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private lessonService: LessonServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params =>  this.id = Number(params.get('id'))
    );
    this.getbyId(this.id);
    this.refreshLessons();
  }
  addError(error:any){
    this.errorText = error.message;
  }
   refreshLessons() {
    this.lessonService.getAllLessons().subscribe((data) => {
      this.lessons = data;
    },
    (error) => {
      console.log(error)
      this.addError(error)
    });
  }

getbyId(id: number ){
this.lessonService.getById(id).subscribe(
  (  data)=>{
    this.lesson=data;
  },
  (error) => {
    console.log(error)
    this.addError(error)
  }
)
}

updateLesson(f:NgForm){
this.lessonService.updateLesson(f.value.name,this.id).subscribe(
  (data) => {
    if (data == this.badreq) {
      this.alertService.error('Fərqli adla yenidən cəhd edin!');
    } else if (data === this.notfound) {
      this.alertService.error('Element Tapılmadı');
    } else if (data === this.ok) {
      this.alertService.success('Dərs yeniləndi!');
      this.refreshLessons();
      this.router.navigate(['/lessons']);
    } else {
      console.log(data)
      this.alertService.warning("Bilinməyən problem baş verdi detallarına console hissədən baxın");
    }
  },
  (error) => {
    this.alertService.error("Error code: "+error.status);
      this.addError(error)
  }
)} 
}
