import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { RoomType } from 'src/app/core/models/RoomType.models';
import { RoomTypeServiceService } from 'src/app/core/services/roomTypeService/room-type-service.service';

@Component({
  selector: 'app-room-type-update',
  templateUrl: './room-type-update.component.html',
  styleUrls: ['./room-type-update.component.scss']
})
export class RoomTypeUpdateComponent implements OnInit {
  roomTypes: RoomType[] = [];
  roomType: RoomType = new RoomType();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private roomTypeService: RoomTypeServiceService,
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
    this.refreshRoomType();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshRoomType() {
    this.roomTypeService.getAllRoomTypes().subscribe((data) => {
      this.roomTypes = data;
    },
      (error) => {
        console.log(error)
        this.addError(error)
      });
  }

  getbyId(id: number) {
    this.roomTypeService.getById(id).subscribe(
      (data) => {
        this.roomType = data;
      },
      (error) => {
        console.log(error)
        this.addError(error)
      }
    )
  }

  updateRoomType(f: NgForm) {
    this.roomTypeService.updateRoomTypes(f.value.name, this.id).subscribe(
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
          this.alertService.success('RoomType yeniləndi!');
          this.refreshRoomType();
          this.router.navigate(['/roomTypes']);
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