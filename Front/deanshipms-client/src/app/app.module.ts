import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { LoginComponent } from './login/login.component'
const routes: Routes = [
{path:"student", component:StudentComponent},
{path:"login", component:LoginComponent},
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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MdbCheckboxModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }