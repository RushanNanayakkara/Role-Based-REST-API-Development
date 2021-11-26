export abstract class XeptagonError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
    }
}