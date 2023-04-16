import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/core/models/Gender.models';
import { Location } from 'src/app/core/models/Location.models';
import { Person } from 'src/app/core/models/Person';
import { Position } from 'src/app/core/models/Position.models';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { GenderServiceService } from 'src/app/core/services/genderServices/gender-service.service';
import { LocationServiceService } from 'src/app/core/services/locationServices/location-service.service';
import { PersonService } from 'src/app/core/services/personService/person.service';
import { PositionServiceService } from 'src/app/core/services/positionService/position-service.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit {
  title = 'httpGet Example';
  persons: Person[] = [];
  genders: Gender[] = [];
  locations: Location[] = [];
  positions: Position[] = [];
  person: Person = new Person();
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  errorText: string = "";
  constructor(
    private personService:PersonService,
    private genderService:GenderServiceService,
    private locationService: LocationServiceService,
    private positionService:PositionServiceService,
    private alertService: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshPerson();
    this.refreshGender();
    this.refreshLocations();
    this.refreshPosition();
  }
  addError(error: any) {
    this.errorText = error.message;
  }
  refreshPerson() {
    this.personService.getAllPersons().subscribe((data) => {
      console.log(data);
      this.persons = data;
    },
      (error) => {
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
  
  createPerson() {

    this.personService.createPerson(this.person).subscribe(
      (data) => {
        console.log("data: " + data)
        console.log(this.person);
        if (data == this.badreq) {
          console.log('bad');
          this.alertService.error('Bu adda elemt var!');
        } else if (data === this.notfound) {
          console.log('notF');
          this.alertService.error('Boş saxlanıla bilməz!');
        } else if (data === this.ok) {
          console.log('ok');
          this.alertService.success('Yeni Person əlavə edildi!');
          this.refreshPerson();
          this.router.navigate(['/persons']);
        } else {
          this.alertService.warning(data);
          console.log(data)
        }
      },
      (error) => {
        console.log(error)
        this.alertService.error(error.error.text);
      }
    );
  }
}
