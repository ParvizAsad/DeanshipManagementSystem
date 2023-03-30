import {Component, OnInit,Input} from '@angular/core';
import { faVenusMars } from '@fortawesome/free-solid-svg-icons';
import {faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  faLocation = faLocationDot;
  faVenusMars=faVenusMars;
  faBook = faBook;
  faBuildingColumns=faBuildingColumns;
  constructor() { }

  ngOnInit() {
  }
}
