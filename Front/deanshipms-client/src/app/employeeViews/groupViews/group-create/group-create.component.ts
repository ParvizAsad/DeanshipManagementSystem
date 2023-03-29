import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { HttpResponse } from '@angular/common/http';
import { response } from 'express';
import { Group } from 'src/app/core/models/Group.models';
import { GroupServiceService } from 'src/app/core/services/groupService/group-service.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {
  title = 'httpGet Example';
  groups: Group[] = [];
  group: Group = new Group();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private groupService: GroupServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshGroup();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshGroup() {
    this.groupService.getAllGroups().subscribe((data) => {
      console.log(data);
      this.groups = data;
    },
      (error) => {
        this.addError(error)
      }
    );
  }

  createGroups() {
    this.groupService.createGroups(this.group).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.group);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni qrup uğurla yaradıldı!');
          this.refreshGroup();
          this.router.navigate(['/groups']);
        } else {
          this.alertService.warning(data);
          console.log(data)
        }
      },
      (error) => {
        console.log(error)
        this.alertService.error("statusCode: " + error.status);
      }
    );
  }
}
