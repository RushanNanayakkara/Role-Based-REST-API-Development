import { XeptagonError } from "./xeptagon.error";

export class DuplicateEntry extends XeptagonError {
    public static readonly statusCode: number = 409;
    constructor(message: string) {
        super(DuplicateEntry.statusCode, message);
    }
}