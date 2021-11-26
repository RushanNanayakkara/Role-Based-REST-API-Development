import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedError } from "../interfaces/errors/unauthorized.error";
import { JWT_SECRET } from "../util/constants";

export async function expressAuthentication(
    request: Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        const {authorization} = request.headers;

        if (!authorization) throw new UnauthorizedError("Unauthorized");

        if (!authorization.startsWith("Bearer"))
          throw new UnauthorizedError("Unauthorized");
        
        const split = authorization.split("Bearer ");
        
        if (split.length !== 2) throw new UnauthorizedError("Unauthorized");
        
        const token = split[1];

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new UnauthorizedError("Unauthorized"));
            }
            jwt.verify(token, JWT_SECRET, function (err: any, decoded: any) { 
                if (err) { 
                    console.error(err.message);
                    reject(new UnauthorizedError("Invalid token"));
                } else {
                    if (!scopes) throw new UnauthorizedError("Unauthorized scope")
                    for (let scope of scopes) {
                        if (!decoded.scopes.includes(scope)) {
                            reject(new UnauthorizedError("Unauthorized scope"));
                        }
                    }
                    resolve(decoded);
                }
            });
        });
    }
}