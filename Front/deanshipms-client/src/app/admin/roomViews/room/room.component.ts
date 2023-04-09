import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/core/models/Room.models';
import { RoomServiceService } from 'src/app/core/services/roomService/room-service.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  title = 'httpGet Example';
  rooms: Room[] = [];
  room!: Room;
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  loading: boolean = true;
  errorText: string = "";
  constructor(private roomService: RoomServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.loading)
    this.refreshRoom()
  }

  addError(error: any) {
    this.errorText = error.message;
  }

  refreshRoom() {
    this.loading = true
    this.roomService.getAllRooms()
      .subscribe(data => {
        console.log(data)
        this.loading = false
        this.rooms = data;
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
      this.roomService.getAllActiveRooms()
        .subscribe((data) => {
          this.loading = false
          this.rooms = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          }
        )
    }
    else if (value === 'Passiv') {
      this.roomService.getAllPassiveRooms()
        .subscribe((data) => {
          this.loading = false
          this.rooms = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
    else if (value === 'All') {
      this.roomService.getAllRooms()
        .subscribe(data => {
          console.log(data)
          this.loading = false
          this.rooms = data;
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
        this.roomService.deleteRooms(id).subscribe(
          (data) => {
            console.log(data)
            this.refreshRoom();
            if (data === this.notfound) {
              this.alertService.error('Element Tapılmadı');
            } else if (data === this.ok) {
              this.alertService.success('Uğurlu əməliyyat!');
              this.router.navigate(['/rooms']);
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
