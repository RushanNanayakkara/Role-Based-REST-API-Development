import { ClassModule } from "../util/constants";
import { InstructorUser, StudentUser } from "./user.model";

export class Class{
    public constructor(
        protected _id: string,
        protected _instructor: InstructorUser,
        protected _password: string,
        protected _students: StudentUser[],
        protected _classModules: ClassModule[]
    ){}

    public get id() : string {
        return this._id;
    }
    
    public set id(v : string) {
        this._id = v;
    }

    public get instructor() : InstructorUser {
        return this._instructor;
    }
    
    public set instructor(v : InstructorUser) {
        this._instructor = v;
    }
    
    public get password() : string {
        return this._password;
    }
    
    public set password(v : string) {
        this._password = v;
    }
    
    public get students() : StudentUser[] {
        return this._students;
    }

    
    public get classModules() : ClassModule[] {
        return this._classModules;
    }
    
    
    public set classModules(v : ClassModule[]) {
        this._classModules = v;
    }

}