export class TokenSet{
    constructor(
        private _authToken:string,
        private _authTokenExpire: number,
        private _resfreshToken:string,
        private _refreshTokenExpire:number
    ){}
    
    public get authToken() : string {
        return this._authToken;
    }

    
    public set authToken(v : string) {
        this._authToken = v;
    }
    
    public get refreshToken() : string {
        return this._resfreshToken;
    }
    
    public set refresshToken(v : string) {
        this._resfreshToken = v;
    }
    
    public get authTokenExpire() : number {
        return this._authTokenExpire;
    }

    
    public set authTokenExpire(v : number) {
        this._authTokenExpire = v;
    }
    
    public get refreshTokenExpire() : number {
        return this._refreshTokenExpire;
    }

    
    public set refreshTokenExpire(v : number) {
        this._refreshTokenExpire = v;
    }

    public toJSON(){
        return {
            authToken: this._authToken,
            authTokenExpire: this._authTokenExpire,
            resfreshToken: this._resfreshToken,
            refreshTokenExpire: this._refreshTokenExpire,
        }
    }

}