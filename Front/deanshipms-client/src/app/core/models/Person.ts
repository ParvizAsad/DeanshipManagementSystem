import { Gender } from "./Gender.models";
import { Location } from "./Location.models";
import { Position } from "./Position.models";
export class Person{
  id:number=0; 
  pasportId:string="";
  fullName:string="";
  birthDate:Date=new Date;	
  phno:string="";
  email:string="";
  gender:Gender ={
    "id":0,
    "name":"",
    "isDelete":false,
    "delete":false
  };

  location:Location={
    "id":0,
    "name":"",
    "isDelete":false,
    "delete":false
  };
  
  position:Position={
    "id":0,
    "name":"",
    "isDelete":false,
    "delete":false
  };
  isDelete:boolean=false;
  delete:boolean=false;
  }
  