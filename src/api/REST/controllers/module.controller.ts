import {
    Controller,
    Get,
    Route,
    Response,
    SuccessResponse,
    Security,
    Request,
} from "tsoa";
import { ValidateErrorJSON } from "../interfaces/errors/validation.error";
import { ModuleResponse } from "../models/responses/module.response";
import { moduleService } from "../services/module.service";
import { AuthenticatedRequest } from "../interfaces/requests/authenticated.request";

@Route("modules")
export class UsersController extends Controller {

    /**
     * Creates a user with the given data.
     * @param requestBody
     * @returns Craeted user with id and generated password
     */
     @Get()
     @Security("jwt")
     @SuccessResponse("200", "Success")
     // @Example(userCreateResonse)
     @Response<ValidateErrorJSON>(422, "Validation Failed")
     public async getModuleForUser(@Request() request: AuthenticatedRequest): Promise<ModuleResponse> {
         this.setStatus(200);
         return new ModuleResponse(await moduleService.getForUser(request.user.uid));
     }

     /**
      * Creates a user with the given data.
      * @param requestBody
      * @returns Craeted user with id and generated password
      */
     @Get()
     @Security("jwt")
     @SuccessResponse("200", "Success")
     // @Example(userCreateResonse)
     public async executeModule(@Request() request: AuthenticatedRequest,): Promise<ModuleResponse> {
         this.setStatus(200);
         return new ModuleResponse(await moduleService.getForUser(request.user.uid));
     }
}