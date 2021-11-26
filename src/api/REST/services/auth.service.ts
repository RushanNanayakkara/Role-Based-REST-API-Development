import { AuthRequest, JWTPayload, RefreshRequest } from "../interfaces/requests/auth.request";
import { TokenSet } from "../models/responses/auth.response";
import { UserBase } from '../models/user.model';
import { sign as signJwt, verify as verifyJwt } from 'jsonwebtoken';
import { usersService } from './user.service';
import { moduleService } from "./module.service";
import bcrypt from "bcrypt";
import { UnauthorizedError } from "../interfaces/errors/unauthorized.error";

class AuthService {

    readonly JWT_SECRET:string = "test";
    readonly Auth_Token_TTL: number = 60;
    readonly Refresh_Token_TTL: number = 60*60;
    
    public async generateToken(authParam: AuthRequest): Promise<TokenSet> {
        const user: UserBase = usersService.get(authParam.username);
        
        if(!user){
            throw new UnauthorizedError("Invalid credentials");
        }

        const isEqaual = await bcrypt.compare(authParam.password,user.password)
        .catch(err=>{
            console.error(err);
            throw new Error("Internal error.");
        });

        if(!isEqaual){
            throw new UnauthorizedError("Invalid credentials");
        }

        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        
        return new TokenSet(
            accessToken,
            this.Auth_Token_TTL,
            refreshToken,
            this.Refresh_Token_TTL
        );
    }

    public refreshToken(refreshParam: RefreshRequest): TokenSet {
        let payload:JWTPayload;
        try{
            payload = verifyJwt(refreshParam.refresh_token,this.JWT_SECRET) as JWTPayload;
        }
        catch(err:any){
            throw new UnauthorizedError(err.message);
        }
 
        const user: UserBase = usersService.get(payload.uid);
        return new TokenSet(
            this.generateAccessToken(user),
            this.Auth_Token_TTL,
            this.generateRefreshToken(user),
            this.Refresh_Token_TTL
        );
    }

    private generateAccessToken(user: UserBase): string {
        const userModules: String[] = moduleService
                                        .getForUser(user.id)
                                        .map(classModule => classModule.toString());
        console.log(userModules);
        const access_token = signJwt(
            {
                uid: user.id,
                scope: userModules
            },
            this.JWT_SECRET,
            {
                expiresIn: this.Auth_Token_TTL,
                subject: user.name,
                issuer: "xeptagon-class-api"
            }
        );
        return access_token;
    }

    private generateRefreshToken(user: UserBase): string {
        const refresh_token = signJwt(
            {
                uid: user.id,
            },
            this.JWT_SECRET,
            {
                expiresIn: this.Refresh_Token_TTL,
                subject: user.name,
                issuer: "xeptagon-class-api"
            }
        );
        return refresh_token;
    }

}

export const authService = new AuthService();