import { UserBase } from "../user.model";

export class UserCreationResponse {

    private _password: string;

    constructor(user: UserBase) {
        this._password = user.password;
    }

    public get password(): string {
        return this._password;
    }

    public set password(v: string) {
        this._password = v;
    }

    public toJSON() {
        return {
            password: this._password
        }
    }
}