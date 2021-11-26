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
  
  @Route("class")
  export class ClassController extends Controller {
  
    /**
     * Creates a user with the given data.
     * @param requestBody
     * @returns Craeted user with id and generated password
     */
    @Post("")
    @Security("jwt", [UserType.Instructor])
    @SuccessResponse("201", "Created")
    // @Example(userCreateResonse)
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    public async createInstructorUser(
      @Body() requestBody: ClassCreateRequest
    ): Promise<UserCreationResponse> {
      this.setStatus(201);
      return classService.create(requestBody);
    }
  
  }