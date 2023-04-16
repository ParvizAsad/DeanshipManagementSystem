import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
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
import { AlertifyService } from './core/services/alertifyService/alertify.service';
import { HttpClientModule } from '@angular/common/http';
import { GenderComponent } from './admin/genderViews/gender/gender.component';
import { GenderCreateComponent } from './admin/genderViews/gender-create/gender-create.component';
import { GenderUpdateComponent } from './admin/genderViews/gender-update/gender-update.component';
import { LocationComponent } from './admin/locationViews/location/location.component';
import { LocationCreateComponent } from './admin/locationViews/location-create/location-create.component';
import { LocationUpdateComponent } from './admin/locationViews/location-update/location-update.component';
import { LocationServiceService } from './core/services/locationServices/location-service.service';
import { DepartmentUpdateComponent } from './admin/departmentViews/department-update/department-update.component';
import { DepartmentComponent } from './admin/departmentViews/department/department.component';
import { DepartmenCreateComponent } from './admin/departmentViews/department-create/departmen-create.component';
import { GroupCreateComponent } from './employeeViews/groupViews/group-create/group-create.component';
import { GroupUpdateComponent } from './employeeViews/groupViews/group-update/group-update.component';
import { LessonCreateComponent } from './employeeViews/lessonViews/lesson-create/lesson-create.component';
import { LessonUpdateComponent } from './employeeViews/lessonViews/lesson-update/lesson-update.component';
import { GroupComponent } from './employeeViews/groupViews/group/group.component';
import { TeacherModuleComponent } from './teacherModuls/teacher-module/teacher-module.component';
import { ExamDetailCreateComponent } from './teacherModuls/examDetailsViews/exam-detail-create/exam-detail-create.component';
import { ExamDetailComponent } from './teacherModuls/examDetailsViews/exam-detail/exam-detail.component';
import { ExamDetailUpdateComponent } from './teacherModuls/examDetailsViews/exam-detail-update/exam-detail-update.component';
import { LessonDetailComponent } from './teacherModuls/lessonDetailViews/lesson-detail/lesson-detail.component';
import { LessonDetailUpdateComponent } from './teacherModuls/lessonDetailViews/lesson-detail-update/lesson-detail-update.component';
import { EmployeeModuleComponent } from './employeeViews/employee-module/employee-module.component';
import { LessonComponent } from './employeeViews/lessonViews/lesson/lesson.component';
import { Lesson } from './core/models/Lesson.models';
import { MajorComponent } from './admin/majorViews/major/major.component';
import { MajorUpdateComponent } from './admin/majorViews/major-update/major-update.component';
import { MajorCreateComponent } from './admin/majorViews/major-create/major-create.component';
import { DegreeCreateComponent } from './admin/degreeViews/degree-create/degree-create.component';
import { DegreeComponent } from './admin/degreeViews/degree/degree.component';
import { DegreeUpdateComponent } from './admin/degreeViews/degree-update/degree-update.component';
import { PositionComponent } from './admin/positionViews/position/position.component';
import { PositinCreateComponent } from './admin/positionViews/positin-create/positin-create.component';
import { PositionUpdateComponent } from './admin/positionViews/position-update/position-update.component';
import { RoomTypeComponent } from './admin/lessonTypeViews/room-type/room-type.component';
import { RoomTypeCreateComponent } from './admin/lessonTypeViews/room-type-create/room-type-create.component';
import { RoomTypeUpdateComponent } from './admin/lessonTypeViews/room-type-update/room-type-update.component';
import { RoomComponent } from './admin/roomViews/room/room.component';
import { RoomCreateComponent } from './admin/roomViews/room-create/room-create.component';
import { RoomUpdateComponent } from './admin/roomViews/room-update/room-update.component';
import { PersonCreateComponent } from './employeeViews/personViews/person-create/person-create.component';
import { PersonUpdateComponent } from './employeeViews/personViews/person-update/person-update.component';
import { PersonComponent } from './employeeViews/personViews/person/person.component';
const routes: Routes = [
{path:"student", component:StudentComponent},
{path:"login", component:LoginComponent},
{path:"department", component:DepartmentComponent},
{path:"departmentEdit/:id", component:DepartmentUpdateComponent},
{path:"departmentnCreate", component:DepartmenCreateComponent},

{path:"student", component:StudentComponent},

{path:"groups", component:GroupComponent},
{path:"groupCreate", component:GroupCreateComponent},
{path:"groupEdit/:id", component:GroupUpdateComponent},

{path:"lessons", component:LessonComponent},
{path:"lessonCreate", component:LessonCreateComponent},
{path:"lessonEdit/:id", component:LessonUpdateComponent},

{path:"majors", component:MajorComponent},
{path:"majorCreate", component:MajorCreateComponent},
{path:"majorEdit/:id", component:MajorUpdateComponent},

{path:"rooms", component:RoomComponent},
{path:"roomCreate", component:RoomCreateComponent},
{path:"roomEdit/:id", component:RoomUpdateComponent},

{path:"persons", component:PersonComponent},
{path:"personCreate", component:PersonCreateComponent},
{path:"personEdit/:id", component:PersonUpdateComponent},

{path:"degrees", component:DegreeComponent},
{path:"degreeCreate", component:DegreeCreateComponent},
{path:"degreeEdit/:id", component:DegreeUpdateComponent},

{path:"positions", component:PositionComponent},
{path:"positionCreate", component:PositinCreateComponent},
{path:"positionEdit/:id", component:PositionUpdateComponent},

{path:"roomTypes", component:RoomTypeComponent},
{path:"roomTypeCreate", component:RoomTypeCreateComponent},
{path:"roomTypeEdit/:id", component:RoomTypeUpdateComponent},

{path:"genders", component:GenderComponent},
{path:"genderCreate", component:GenderCreateComponent},
{path:"genderEdit/:id", component:GenderUpdateComponent},

{path:"locations", component:LocationComponent},
{path:"locationCreate", component:LocationCreateComponent},
{path:"locationEdit/:id", component:LocationUpdateComponent},

{path:"settings", component:SettingsComponent},
{path:"employee", component:EmployeeComponent},

{path:"teacherModule", component:TeacherModuleComponent},
{path:"employeeModule", component:EmployeeModuleComponent},
{path:"", component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentComponent,
    HomeComponent,
    TeacherComponent,
    CardComponent,
    
    LoginComponent,
    RegisterComponent,

    EmployeeComponent,
    SettingsComponent,
    
    GenderComponent,
    GenderCreateComponent,
    GenderUpdateComponent,
    

    LocationComponent,
    LocationCreateComponent,
    LocationUpdateComponent,

   DepartmentComponent,
   DepartmenCreateComponent,
   DepartmentUpdateComponent,

   GroupComponent,
   GroupCreateComponent,
   GroupUpdateComponent,

   LessonComponent,
   LessonCreateComponent,
   LessonUpdateComponent,

   TeacherModuleComponent,

   ExamDetailCreateComponent,
   ExamDetailComponent,
   ExamDetailUpdateComponent,

   LessonDetailComponent,
   LessonDetailUpdateComponent,
   EmployeeModuleComponent,

   MajorComponent,
   MajorUpdateComponent,
   MajorCreateComponent,

   DegreeComponent,
   DegreeCreateComponent,
   DegreeUpdateComponent,

   PositionComponent,
   PositinCreateComponent,
   PositionUpdateComponent,

   RoomTypeComponent,
   RoomTypeCreateComponent,
   RoomTypeUpdateComponent,

   RoomComponent,
   RoomCreateComponent,
   RoomUpdateComponent,

   PersonComponent,
   PersonCreateComponent,
   PersonUpdateComponent,
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