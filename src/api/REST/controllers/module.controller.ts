import {
    Controller,
    Get,
    Route,
    Path,
    Response,
    SuccessResponse,
    Security,
    Request,
} from "tsoa";
import { ValidateErrorJSON } from "../exceptions/validation.error";
import { ExecutedModule, ModuleResponse } from "../models/responses/module.response";
import { moduleService } from "../services/module.service";
import { AuthenticatedRequest } from "../interfaces/requests/authenticated.request";
import { ClassModule } from "../util/constants";
import { UnauthorizedError } from "../exceptions/unauthorized.error";

@Route("modules")
export class UsersController extends Controller {

    /**
     * Get accessible modules for user
     * @param requestBody
     * @returns list of accessible modules
     */
    @Get()
    @Security("jwt")
    @SuccessResponse("200", "Success")
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    public async getModuleForUser(@Request() request: AuthenticatedRequest): Promise<ModuleResponse> {
        this.setStatus(200);
        return new ModuleResponse(await moduleService.getForUser(request.user.uid));
    }

    /**
     * Executes a module if use has permission
     * @param requestBody
     * @returns Text return of the executed module
     */
    @Get("/execute/:module")
    @Security("jwt")
    @SuccessResponse("200", "Success")
    public async executeModule(@Request() request: AuthenticatedRequest, @Path() module: ClassModule): Promise<ExecutedModule> {
        this.setStatus(200);
        if (!request.user.scopes.includes(module.toString())) {
            throw new UnauthorizedError("Unauthorized module");
        }
        return await moduleService.executeModule(module);
    }
}