import {
    Body,
    Controller,
    Post,
    Route,
    Response,
    SuccessResponse,
    Security,
} from "tsoa";
import { ValidateErrorJSON } from "../interfaces/errors/validation.error";
import { UserCreationResponse } from "../models/responses/user.response";
import { UserType } from "../models/user.model";
import { ClassCreateRequest } from "../interfaces/requests/class.request";
import { classService } from "../services/class.service";
import { ClassCreationResponse } from "../models/responses/class.response";

@Route("class")
export class ClassController extends Controller {

    /**
     * Create class with students. Student accounts  are automatically craeted with 
     * relevant scopes.
     * @param requestBody
     * @returns Password for the class
     */
    @Post("")
    @Security("jwt", [UserType.Instructor])
    @SuccessResponse("201", "Created")
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    public async createClassWithStudents(
        @Body() requestBody: ClassCreateRequest
    ): Promise<ClassCreationResponse> {
        this.setStatus(201);
        return classService.create(requestBody);
    }
}