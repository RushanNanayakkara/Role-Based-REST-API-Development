import { AuthRequest } from "../interfaces/requests/auth.request";
import { TokenSet } from "../models/responses/auth.response";
import { UserBase } from '../models/user.model';
import { sign as signJwt } from 'jsonwebtoken';
import { usersService } from './user.service';
import { moduleService } from "./module.service";

class AuthService {

    public generateToken(authParam: AuthRequest): TokenSet {
        console.log(authParam.password);
        const user: UserBase = usersService.get(authParam.username);
        return new TokenSet(
            this.generateAccessToken(user),
            60,
            this.generateRefreshToken(user),
            60*60
        );
    }

    private generateAccessToken(user: UserBase): string {
        const userModules: String[] = moduleService
                                        .getForUser(user.id)
                                        .map(classModule => classModule.toString());
        console.log(userModules);
        const token = signJwt(
            {
                uid: user.id,
                scope: userModules
            },
            "test",
            {
                expiresIn: "60",
                subject: user.name,
                issuer: "xeptagon-class-api"
            }
        );
        return token;
    }

    private generateRefreshToken(user: UserBase): string {
        const token = signJwt(
            {
                uid: user.id,
            },
            "test",
            {
                expiresIn: "1h",
                subject: user.name,
                issuer: "xeptagon-class-api"
            }
        );
        return token;
    }

}

export const authService = new AuthService();