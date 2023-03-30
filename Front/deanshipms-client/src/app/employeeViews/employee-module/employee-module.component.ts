import {Component, OnInit,Input} from '@angular/core';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-module',
  templateUrl: './employee-module.component.html',
  styleUrls: ['./employee-module.component.scss']
})
export class EmployeeModuleComponent  implements OnInit{
  faUserGroup = faUserGroup;
  faBook = faBook;
  constructor() { }

  ngOnInit() {
  }
}
