export class ClassCreationResponse {

    constructor(private _password: string) { }

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