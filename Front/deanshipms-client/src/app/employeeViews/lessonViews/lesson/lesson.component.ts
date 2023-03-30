import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from 'src/app/core/models/Lesson.models';
import { LessonServiceService } from 'src/app/core/services/lessonService/lesson-service.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  title = 'httpGet Example';
  lessons: Lesson[] = [];
  lesson!: Lesson;
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  loading: boolean = true;
  errorText: string = "";
  constructor(
    private lessonService: LessonServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.loading)
    this.refreshLesson()
  }

  addError(error: any) {
    this.errorText = error.message;
  }

  refreshLesson() {
    this.loading = true
    this.lessonService.getAllLessons()
      .subscribe(data => {
        console.log(data)
        this.loading = false
        this.lessons = data;
      },
        (error) => {
          this.loading = false
          console.log(error)
          this.addError(error)
        }
      )
  }

  onItemChange(value: any) {
    this.loading = true
    if (value === 'Active') {
      this.lessonService.getAllActiveLessons()
        .subscribe((data) => {
          this.loading = false
          this.lessons = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          }
        )
    }
    else if (value === 'Passiv') {
      this.lessonService.getAllPassiveLessons()
        .subscribe((data) => {
          this.loading = false
          this.lessons = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
    else if (value === 'All') {
      this.lessonService.getAllLessons()
        .subscribe(data => {
          console.log(data)
          this.loading = false
          this.lessons = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
  }

  changeActivate(id: number, situation: boolean) {
    let showSituation: String = !situation ? "Aktiv" : "Passiv";
    this.alertService.confirm("Aktiv/Passiv", "Bu elementin vəziyyətini dəyişmək istədiyinizdən əminsiniz? \n Cari vəziyyəti: "
      + showSituation,
      () => {
        this.lessonService.deleteLesson(id).subscribe(
          (data) => {
            console.log(data)
            this.refreshLesson();
            if (data === this.notfound) {
              this.alertService.error('Element Tapılmadı');
            } else if (data === this.ok) {
              this.alertService.success('Uğurlu əməliyyat!');
              this.router.navigate(['/lessons']);
            } else {
              this.alertService.warning("Bilinməyən problem baş verdi detallarına console hissədən baxın");
            }
          },
          (error) => {
            console.log(error)
            this.alertService.error("Error code: " + error.status);
          }
        )
      },
      () => {
        this.alertService.warning("Cancel");
      }
    );
  }
}

