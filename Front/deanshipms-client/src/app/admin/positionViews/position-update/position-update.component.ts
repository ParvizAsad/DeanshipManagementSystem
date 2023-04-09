import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { Position } from 'src/app/core/models/Position.models';
import { PositionServiceService } from 'src/app/core/services/positionService/position-service.service';

@Component({
  selector: 'app-position-update',
  templateUrl: './position-update.component.html',
  styleUrls: ['./position-update.component.scss']
})
export class PositionUpdateComponent implements OnInit {
  positions: Position[] = [];
  position: Position = new Position();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private positionService: PositionServiceService,
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
    this.refreshPosition();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshPosition() {
    this.positionService.getAllPositions().subscribe((data) => {
      this.positions = data;
    },
      (error) => {
        console.log(error)
        this.addError(error)
      });
  }

  getbyId(id: number) {
    this.positionService.getById(id).subscribe(
      (data) => {
        this.position = data;
      },
      (error) => {
        console.log(error)
        this.addError(error)
      }
    )
  }

  updatePosition(f: NgForm) {
    this.positionService.updatePositions(f.value.name, this.id).subscribe(
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
          this.alertService.success('Position yeniləndi!');
          this.refreshPosition();
          this.router.navigate(['/positions']);
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