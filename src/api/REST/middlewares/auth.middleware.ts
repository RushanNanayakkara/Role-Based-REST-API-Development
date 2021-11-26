import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedError } from "../interfaces/errors/unauthorized.error";

export async function expressAuthentication(
    request: Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        const token =
            request.body.token ||
            request.query.token ||
            request.headers["x-access-token"];

        return new Promise((resolve, reject) => {
            resolve("Hello world");
            if (!token) {
                reject(new UnauthorizedError("Unauthorized"));
            }

            jwt.verify(token, "[secret]", function (err: any, decoded: any) {
                if (err) {
                    reject(err);
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