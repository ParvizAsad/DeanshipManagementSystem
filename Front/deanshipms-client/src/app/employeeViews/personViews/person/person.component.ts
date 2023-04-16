import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/alertifyService/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/core/models/Person';
import { PersonService } from 'src/app/core/services/personService/person.service';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent  implements OnInit {
  title = 'httpGet Example';
  persons: Person[] = [];
  person!: Person;
  badreq: any = 'BAD_REQUEST';
  notfound: any = 'NOT_FOUND';
  ok: any = 'OK';
  loading: boolean = true;
  errorText: string = "";
  constructor(private personService: PersonService,
    private alertService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.loading)
    this.refreshPerson()
  }

  addError(error: any) {
    this.errorText = error.message;
  }

  refreshPerson() {
    this.loading = true
    this.personService.getAllPersons()
      .subscribe(data => {
        console.log(data)
        this.loading = false
        this.persons = data;
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
      this.personService.getAllActivePerson()
        .subscribe((data) => {
          this.loading = false
          this.persons = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          }
        )
    }
    else if (value === 'Passiv') {
      this.personService.getAllPassivPerson()
        .subscribe((data) => {
          this.loading = false
          this.persons = data;
        },
          (error) => {
            this.loading = false
            this.addError(error)
          })
    }
    else if (value === 'All') {
      this.personService.getAllPersons()
        .subscribe(data => {
          console.log(data)
          this.loading = false
          this.persons = data;
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
        this.personService.deletePerson(id).subscribe(
          (data) => {
            console.log(data)
            this.refreshPerson();
            if (data === this.notfound) {
              this.alertService.error('Element Tapılmadı');
            } else if (data === this.ok) {
              this.alertService.success('Uğurlu əməliyyat!');
              this.router.navigate(['/persons']);
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
