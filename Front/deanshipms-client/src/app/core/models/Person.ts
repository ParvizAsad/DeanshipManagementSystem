export class Student{
    fullName:string;
    id:number;
    locationId:number;
    genderId:number;
    birtDate:Date;
    username:string;
    email:string;
  
    constructor(fullName: string,id: number, username: string, email: string, locationId:number, 
    genderId:number, birtDate:Date) {
      this.fullName = fullName;
      this.id = id;
      this.genderId=genderId;
      this.locationId=locationId;
      this.birtDate=birtDate;
      this.username = username;
      this.email = email;
    }
  }
  