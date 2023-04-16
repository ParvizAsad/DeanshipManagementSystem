import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { NgForm } from '@angular/forms';
import { Person } from 'src/app/core/models/Person';
import { Gender } from 'src/app/core/models/Gender.models';
import { Location } from 'src/app/core/models/Location.models';
import { Position } from 'src/app/core/models/Position.models';
import { PersonService } from 'src/app/core/services/personService/person.service';
import { GenderServiceService } from 'src/app/core/services/genderServices/gender-service.service';
import { LocationServiceService } from 'src/app/core/services/locationServices/location-service.service';
import { PositionServiceService } from 'src/app/core/services/positionService/position-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.scss']
})
export class PersonUpdateComponent implements OnInit {
  persons: Person[] = [];
  genders: Gender[] = [];
  locations: Location[] = [];
  positions: Position[] = [];
  formattedDateTime!:string;
  person: Person = new Person();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  id!: number;
  errorText: string = "";
  constructor(
    private personService:PersonService,
    private genderService:GenderServiceService,
    private locationService: LocationServiceService,
    private positionService:PositionServiceService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => this.id = Number(params.get('id'))
    );
    this.getbyId(this.id);
    this.refreshPerson();
    this.refreshGender();
    this.refreshLocations();
    this.refreshPosition();
    this.formattedDateTime = this.datePipe.transform(this.person.birthDate, 'dd/MM/yyyy HH:mm:ss') ?? '';
  }
  addError(error: any) {
    this.errorText = error.message;
  }

  refreshPerson() {
    this.personService.getAllPersons().subscribe((data) => {
      this.persons = data;
    },
      (error) => {
        console.log(error)
        this.addError(error)
      });
  }

  refreshGender() {
    this.genderService.getAllActiveGender()
      .subscribe(data => {
        console.log(data)
        this.genders = data;
      },
        (error) => {
          console.log(error)
          this.addError(error)
        }
      )
  }
  
  refreshPosition() {
    this.positionService.getAllActivePositions()
      .subscribe(data => {
        console.log(data)
        this.positions = data;
      },
        (error) => {
          console.log(error)
          this.addError(error)
        }
      )
  }

  refreshLocations() {
    this.locationService.getAllActiveLocation()
      .subscribe(data => {
        console.log(data)
        this.locations = data;
      },
        (error) => {
          console.log(error)
          this.addError(error)
        }
      )
  }

  getbyId(id: number) {
    this.personService.getById(id).subscribe(
      (data) => {
        this.person = data;
      },
      (error) => {
        console.log(error)
        this.addError(error)
      }
    )
  }

  updatePerson(f: NgForm) {
    this.personService.updatePerson(f.value.name, this.id).subscribe(
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
          this.alertService.success('Person yeniləndi!');
          this.refreshPerson();
          this.router.navigate(['/persons']);
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
