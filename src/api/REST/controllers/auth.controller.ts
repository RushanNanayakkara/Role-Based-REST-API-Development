import {
    Body,
    Controller,
    Post,
    Route,
    Response,
    SuccessResponse,
    Example,
} from "tsoa";
import { userCreateResonse } from "../util/examples/user.example.response";
import { ValidateErrorJSON } from "../interfaces/errors/validation.error";
import { AuthRequest, RefreshRequest } from "../interfaces/requests/auth.request";
import { TokenSet } from "../models/responses/auth.response";
import { authService } from "../services/auth.service";

@Route("auth")
export class AuthController extends Controller {

    /**
     * Generates auth token for correnct credentials.   
     * @param requestBody
     * @returns JWT token and refresh token if user is authenticated 
     */
     @Post("generate-token")
     @SuccessResponse("201", "Created")
     @Example(userCreateResonse)
     @Response<ValidateErrorJSON>(422, "Invalid data")
     public async generateToken(
         @Body() requestBody: AuthRequest
     ): Promise<TokenSet> {
         this.setStatus(201);
         return authService.generateToken(requestBody);
     }

     /**
      * Refresh token set for valid refresh token.   
      * @param requestBody
      * @returns JWT token and refresh token if user is authenticated 
      */
     @Post("refresh-token")
     @SuccessResponse("201", "Created")
     @Example(userCreateResonse)
     @Response<ValidateErrorJSON>(422, "Invalid data")
     public async refreshToken(
         @Body() requestBody: RefreshRequest
     ): Promise<TokenSet> {
         this.setStatus(201);
         return authService.refreshToken(requestBody);
     }
}