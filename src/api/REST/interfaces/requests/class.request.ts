import { ClassModule } from "../../util/constants";

export class ClassCreateRequest {
    constructor(private _name: string, private _modules: ClassModule[], private _students: string[]) { }


    public get name(): string {
        return this._name;
    }

    public get modules(): ClassModule[] {
        return this._modules;
    }

    public get students(): string[] {
        return this._students;
    }


    public set name(v: string) {
        this._name = v;
    }


    public set modules(v: ClassModule[]) {
        this._modules = v;
    }


    public set students(v: string[]) {
        this._students = v;
    }


    public toJSON() {
        return {
            name: this._name,
            modules: this._modules,
            students: this._students
        }
    }
}