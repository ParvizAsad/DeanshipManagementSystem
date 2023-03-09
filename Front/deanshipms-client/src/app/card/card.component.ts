import {Component, OnInit,Input} from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  faBook = faBook;
  faPerson=faPerson;
  faGears=faGears;
  faUserGraduate=faUserGraduate;
  constructor() { }

  ngOnInit() {
  }
}
