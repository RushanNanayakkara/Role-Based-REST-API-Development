import { XeptagonError } from "./xeptagon.error";

export class UnauthorizedError extends XeptagonError{
    public static readonly statusCode:number = 401;
    constructor(message:string){
        super(UnauthorizedError.statusCode, message);
    }
}