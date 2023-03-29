import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/core/models/Group.models';
import { GroupServiceService } from 'src/app/core/services/groupService/group-service.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  title = 'httpGet Example';
  groups: Group[] = [];
  group!: Group;
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  loading: boolean = true;
  errorText: string = "";
  constructor(
    private groupService: GroupServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.loading)
    this.refreshGroup()
  }

  addError(error: any) {
    this.errorText = error.message;
  }

  refreshGroup() {
    this.loading = true
    this.groupService.getAllGroups()
      .subscribe(data => {
        console.log(data)
        this.loading = false
        this.groups = data;
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
      this.groupService.getAllActiveGroups()
        .subscribe((data) => {
          this.loading = false
          this.groups = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          }
        )
    }
    else if (value === 'Passiv') {
      this.groupService.getAllPassiveGroups()
        .subscribe((data) => {
          this.loading = false
          this.groups = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
    else if (value === 'All') {
      this.groupService.getAllGroups()
        .subscribe(data => {
          console.log(data)
          this.loading = false
          this.groups = data;
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
        this.groupService.deleteGroups(id).subscribe(
          (data) => {
            console.log(data)
            this.refreshGroup();
            if (data === this.notfound) {
              this.alertService.error('Element Tapılmadı');
            } else if (data === this.ok) {
              this.alertService.success('Uğurlu əməliyyat!');
              this.router.navigate(['/groups']);
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

