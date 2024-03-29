import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { RoomServiceService } from 'src/app/core/services/roomService/room-service.service';
import { Room } from 'src/app/core/models/Room.models';
import { RoomType } from 'src/app/core/models/RoomType.models';
import { RoomTypeServiceService } from 'src/app/core/services/roomTypeService/room-type-service.service';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.scss']
})
export class RoomUpdateComponent implements OnInit {
  rooms: Room[] = [];
  room: Room = new Room();
  roomTypes: RoomType[] = [];
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private roomService: RoomServiceService,
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
    this.refreshRoom();
    this.refreshRoomType();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshRoom() {
    this.roomService.getAllRooms().subscribe((data) => {
      this.rooms = data;
    },
      (error) => {
        console.log(error)
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

  getbyId(id: number) {
    this.roomService.getById(id).subscribe(
      (data) => {
        this.room = data;
      },
      (error) => {
        console.log(error)
        this.addError(error)
      }
    )
  }

  updateRoom(f: NgForm) {
    this.roomService.updateRooms(f.value.name, this.id).subscribe(
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
          this.alertService.success('Room yeniləndi!');
          this.refreshRoom();
          this.router.navigate(['/rooms']);
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