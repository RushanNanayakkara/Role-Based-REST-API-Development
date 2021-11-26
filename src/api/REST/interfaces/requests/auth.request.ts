export interface AuthRequest{
    username: string,
    password: string
}

export interface RefreshRequest{
    refresh_token: string
}

export interface JWTPayload{
    uid: string,
    iat: number,
    exp: number,
    iss: string,
    sub: string,
}