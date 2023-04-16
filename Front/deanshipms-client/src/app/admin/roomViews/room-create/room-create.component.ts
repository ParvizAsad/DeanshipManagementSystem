import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { Room } from 'src/app/core/models/Room.models';
import { RoomServiceService } from 'src/app/core/services/roomService/room-service.service';
import { RoomTypeServiceService } from 'src/app/core/services/roomTypeService/room-type-service.service';
import { RoomType } from 'src/app/core/models/RoomType.models';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {
  title = 'httpGet Example';
  rooms: Room[] = [];
  roomTypes: RoomType[] = [];
  roomTypeId:any;
  room: Room = new Room();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private roomService:RoomServiceService,
    private roomTypeService:RoomTypeServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshRoom();
    this.refreshRoomType();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshRoom() {
    this.roomService.getAllRooms().subscribe((data) => {
      console.log(data);
      this.rooms = data;
    },
      (error) => {
        this.addError(error)
      });
  }

  refreshRoomType() {
    this.roomTypeService.getAllRoomTypes()
      .subscribe(data => {
        console.log(data)
        this.roomTypes = data;
      },
        (error) => {
          console.log(error)
          this.addError(error)
        }
      )
  }
  createRoom() {

    this.roomService.createRooms(this.room).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.room);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni Room əlavə edildi!');
          this.refreshRoom();
          this.router.navigate(['/rooms']);
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