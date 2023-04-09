import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { PositionServiceService } from 'src/app/core/services/positionService/position-service.service';
import { Position } from 'src/app/core/models/Position.models';

@Component({
  selector: 'app-positin-create',
  templateUrl: './positin-create.component.html',
  styleUrls: ['./positin-create.component.scss']
})
export class PositinCreateComponent implements OnInit {
  title = 'httpGet Example';
  positions: Position[] = [];
  position: Position = new Position();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private positionService:PositionServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshPosition();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshPosition() {
    this.positionService.getAllPositions().subscribe((data) => {
      console.log(data);
      this.positions = data;
    },
      (error) => {
        this.addError(error)
      });
  }

  createPosition() {
    this.positionService.createPositions(this.position).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.position);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni Position əlavə edildi!');
          this.refreshPosition();
          this.router.navigate(['/positions']);
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