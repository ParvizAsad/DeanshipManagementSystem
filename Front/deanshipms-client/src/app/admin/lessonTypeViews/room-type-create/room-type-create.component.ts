import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { RoomType } from 'src/app/core/models/RoomType.models';
import { RoomTypeServiceService } from 'src/app/core/services/roomTypeService/room-type-service.service';

@Component({
  selector: 'app-room-type-create',
  templateUrl: './room-type-create.component.html',
  styleUrls: ['./room-type-create.component.scss']
})
export class RoomTypeCreateComponent implements OnInit {
  title = 'httpGet Example';
  roomTypes: RoomType[] = [];
  roomType: RoomType = new RoomType();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private roomTypeService:RoomTypeServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshRoomType();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshRoomType() {
    this.roomTypeService.getAllRoomTypes().subscribe((data) => {
      console.log(data);
      this.roomTypes = data;
    },
      (error) => {
        this.addError(error)
      });
  }

  createRoomType() {
    this.roomTypeService.createRoomTypes(this.roomType).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.roomType);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni RoomType əlavə edildi!');
          this.refreshRoomType();
          this.router.navigate(['/roomTypes']);
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
