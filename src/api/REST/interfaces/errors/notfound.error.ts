import { XeptagonError } from "./xeptagon.error";

export class NotFoundError extends XeptagonError {
    public static readonly statusCode: number = 404;
    constructor(message: string) {
        super(NotFoundError.statusCode, message);
    }
}