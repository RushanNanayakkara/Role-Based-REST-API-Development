import { AuthRequest, JWTPayload, RefreshRequest } from "../interfaces/requests/auth.request";
import { TokenSet } from "../models/responses/auth.response";
import { UserBase } from '../models/user.model';
import { sign as signJwt, verify as verifyJwt } from 'jsonwebtoken';
import { usersService } from './user.service';
import { moduleService } from "./module.service";
import bcrypt from "bcrypt";
import { UnauthorizedError } from "../interfaces/errors/unauthorized.error";
import { Auth_Token_TTL, JWT_SECRET_ACCESS, JWT_SECRET_REFRESH, Refresh_Token_TTL } from "../util/constants";

class AuthService {

    public async generateToken(authParam: AuthRequest): Promise<TokenSet> {
        const user: UserBase = await usersService.get(authParam.username);

        if (!user) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const isEqaual = await bcrypt.compare(authParam.password, user.password)
            .catch(err => {
                console.error(err);
                throw new Error("Internal error.");
            });

        if (!isEqaual) {
            throw new UnauthorizedError("Invalid credentials");
        }

        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        return new TokenSet(
            accessToken,
            Auth_Token_TTL,
            refreshToken,
            Refresh_Token_TTL
        );
    }

    public async refreshToken(refreshParam: RefreshRequest): Promise<TokenSet> {
        let payload: JWTPayload;
        try {
            payload = verifyJwt(refreshParam.refresh_token, JWT_SECRET_REFRESH) as JWTPayload;
        }
        catch (err: any) {
            throw new UnauthorizedError(err.message);
        }

        const user: UserBase = await usersService.getById(payload.uid);
        console.log(payload.uid);
        return new TokenSet(
            await this.generateAccessToken(user),
            Auth_Token_TTL,
            this.generateRefreshToken(user),
            Refresh_Token_TTL
        );
    }

    private async generateAccessToken(user: UserBase): Promise<string> {
        const userModules: String[] = await moduleService
            .getForUser(user.id);
        const access_token = signJwt(
            {
                uid: user.id,
                scopes: [...userModules, user.type]
            },
            JWT_SECRET_ACCESS,
            {
                expiresIn: Auth_Token_TTL,
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
            JWT_SECRET_REFRESH,
            {
                expiresIn: Refresh_Token_TTL,
                subject: user.name,
                issuer: "xeptagon-class-api"
            }
        );
        return refresh_token;
    }

}

export const authService = new AuthService();