import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { Degree } from 'src/app/core/models/Degree.models';
import { DegreeServiceService } from 'src/app/core/services/degreeService/degree-service.service';

@Component({
  selector: 'app-degree-update',
  templateUrl: './degree-update.component.html',
  styleUrls: ['./degree-update.component.scss']
})
export class DegreeUpdateComponent implements OnInit {
  degrees: Degree[] = [];
  degree: Degree = new Degree();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private degreeService: DegreeServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => this.id = Number(params.get('id'))
    );
    this.getbyId(this.id);
    this.refreshDegree();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshDegree() {
    this.degreeService.getAllDegrees().subscribe((data) => {
      this.degrees = data;
    },
      (error) => {
        console.log(error)
        this.addError(error)
      });
  }

  getbyId(id: number) {
    this.degreeService.getById(id).subscribe(
      (data) => {
        this.degree = data;
      },
      (error) => {
        console.log(error)
        this.addError(error)
      }
    )
  }

  updateDegree(f: NgForm) {
    this.degreeService.updateDegrees(f.value.name, this.id).subscribe(
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
          this.alertService.success('Degree yeniləndi!');
          this.refreshDegree();
          this.router.navigate(['/degrees']);
        } else {
          console.log(data)
          this.alertService.warning("Bilinməyən problem baş verdi detallarına console hissədən baxın");
        }
      },
      (error) => {
        console.log(error)
        console.log(error.status)
        this.alertService.error("Error code: " + error.status);
      }
    )
  }
}

