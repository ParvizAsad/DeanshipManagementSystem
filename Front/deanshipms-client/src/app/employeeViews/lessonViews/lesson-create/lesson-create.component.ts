import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { Lesson } from 'src/app/core/models/Lesson.models';
import { LessonServiceService } from 'src/app/core/services/lessonService/lesson-service.service';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.scss']
})
export class LessonCreateComponent implements OnInit {
  title = 'httpGet Example';
  lessons: Lesson[] = [];
  lesson: Lesson = new Lesson();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private lessonService: LessonServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshLesson();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshLesson() {
    this.lessonService.getAllLessons().subscribe((data) => {
      console.log(data);
      this.lessons = data;
    },
      (error) => {
        this.addError(error)
      }
    );
  }

  createLessons() {
    this.lessonService.createLessons(this.lesson).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.lesson);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni dərs uğurla yaradıldı!');
          this.refreshLesson();
          this.router.navigate(['/lessons']);
        } else {
          this.alertService.warning(data);
          console.log(data)
        }
      },
      (error) => {
        console.log(error)
        this.alertService.error("statusCode: " + error.status);
      }
    );
  }
}
