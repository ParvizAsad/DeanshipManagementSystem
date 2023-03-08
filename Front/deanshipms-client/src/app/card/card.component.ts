import {Component, OnInit,Input} from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  faBook = faBook;
  faPerson=faPerson;
  faUserGraduate=faUserGraduate;
  constructor() { }

  ngOnInit() {
  }
}
