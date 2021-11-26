import { Request } from 'express';
import { JWTPayload } from './auth.request';

export interface AuthenticatedRequest extends Request {
    user: JWTPayload
}