import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { DepartmentComponent } from './department/department.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './register/register.component';
import { PersonComponent } from './person/person.component';
import { PersonRegistrationComponent } from './person-registration/person-registration.component'
import { AlertifyService } from './core/services/alertifyService/alertify.service';
import { HttpClientModule } from '@angular/common/http';
import { GenderComponent } from './admin/genderViews/gender/gender.component';
import { GenderCreateComponent } from './admin/genderViews/gender-create/gender-create.component';
import { GenderUpdateComponent } from './admin/genderViews/gender-update/gender-update.component';
import { LocationComponent } from './admin/locationViews/location/location.component';
import { LocationCreateComponent } from './admin/locationViews/location-create/location-create.component';
import { LocationUpdateComponent } from './admin/locationViews/location-update/location-update.component';
import { LocationServiceService } from './core/services/locationServices/location-service.service';
const routes: Routes = [
{path:"student", component:StudentComponent},
{path:"login", component:LoginComponent},
{path:"department", component:DepartmentComponent},
{path:"personRegistration", component:PersonRegistrationComponent},
{path:"person", component:PersonComponent},
{path:"student", component:StudentComponent},
{path:"genders", component:GenderComponent},
{path:"genderEdit/:id", component:GenderUpdateComponent},
{path:"genderCreate", component:GenderCreateComponent},
{path:"locations", component:LocationComponent},
{path:"locationCreate", component:LocationCreateComponent},
{path:"locationEdit/:id", component:LocationUpdateComponent},
{path:"settings", component:SettingsComponent},
{path:"employee", component:EmployeeComponent},
{path:"", component:HomeComponent},
{path:"teacher", component:TeacherComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentComponent,
    HomeComponent,
    TeacherComponent,
    DepartmentComponent,
    CardComponent,
    LoginComponent,
    EmployeeComponent,
    SettingsComponent,
    RegisterComponent,
    PersonComponent,
    PersonRegistrationComponent,
    GenderComponent,
    GenderCreateComponent,
    GenderUpdateComponent,
    LocationComponent,
    LocationCreateComponent,
    LocationUpdateComponent
  ],
  imports: [
    BrowserModule,
    MdbCheckboxModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AlertifyService,
    LocationServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }