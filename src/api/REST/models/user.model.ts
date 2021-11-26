import { Class } from "./class.model";

export enum UserType {
  Admin = "ADMIN",
  Instructor = "INSTRUCTOR",
  Student = "STUDENT"
}
export abstract class UserBase {
  constructor(
    protected _id: string,
    protected _name: string,
    protected _password: string,
    protected _type: UserType,
  ){}

  public get id():string{
    return this._id;
  }
  public set id(id:string){
    this._id = id;
  }

  public get name():string{
    return this._name;
  }
  public set name(name:string){
    this._name = name;
  }

  public get password():string{
    return this._password;
  }
  public set password(password:string){
    this._password = password;
  }

  public get type():UserType{
    return this._type;
  }
  public set type(type:UserType){
    this._type = type;
  }
}

export class AdminUser extends UserBase{}

export class InstructorUser extends UserBase{}

export class StudentUser extends UserBase{
  constructor(
    id: string,
    name: string,
    password: string,
    type: UserType,
    protected _class: Class
  ){
    super(id,name,password,type);
  }

  public get class() : Class {
    return this._class;
  }

  public set class(v : Class) {
    this._class = v;
  }

  public toJSON() {
    return {
      id:this._id,
      nams: this._name,
      password: this._password,
      type: this._type,
      class: {
        id: this._class.id,
        classModules: this._class.classModules
      }
    }
  }
  
}