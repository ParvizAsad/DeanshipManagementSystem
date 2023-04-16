import { RoomType } from "./RoomType.models";
export class Room{
    id:number=0; 
    roomType:RoomType = 
    {
        "id":0,
        "name":"",
        "isDelete":false,
        "delete":false
    };
    roomNumber:string="";
    capacity:string="";
    isDelete:boolean=false;
    delete:boolean=false;
    }