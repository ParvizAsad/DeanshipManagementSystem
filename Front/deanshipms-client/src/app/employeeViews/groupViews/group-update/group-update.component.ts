import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import {  FormsModule,
  FormGroup,
  FormControl } from '@angular/forms';
import { Group } from 'src/app/core/models/Group.models';
import { GroupServiceService } from 'src/app/core/services/groupService/group-service.service';

@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.scss']
})
export class GroupUpdateComponent implements OnInit {
  groups: Group[] = [];
  group:Group =new Group();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private groupService: GroupServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params =>  this.id = Number(params.get('id'))
    );
    this.getbyId(this.id);
    this.refreshGroups();
  }
  addError(error:any){
    this.errorText = error.message;
  }
   refreshGroups() {
    this.groupService.getAllGroups().subscribe((data) => {
      this.groups = data;
    },
    (error) => {
      console.log(error)
      this.addError(error)
    });
  }

getbyId(id: number ){
this.groupService.getById(id).subscribe(
  (  data)=>{
    this.group=data;
  },
  (error) => {
    console.log(error)
    this.addError(error)
  }
)
}

updateGroups(f:NgForm){
this.groupService.updateGroups(f.value.name,this.id).subscribe(
  (data) => {
    if (data == this.badreq) {
      this.alertService.error('Fərqli adla yenidən cəhd edin!');
    } else if (data === this.notfound) {
      this.alertService.error('Element Tapılmadı');
    } else if (data === this.ok) {
      this.alertService.success('Qrup yeniləndi!');
      this.refreshGroups();
      this.router.navigate(['/groups']);
    } else {
      console.log(data)
      this.alertService.warning("Bilinməyən problem baş verdi detallarına console hissədən baxın");
    }
  },
  (error) => {
    this.alertService.error("Error code: "+error.status);
      this.addError(error)
  }
)} 
}
