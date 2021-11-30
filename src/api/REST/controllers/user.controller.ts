import {
  Body,
  Controller,
  Post,
  Route,
  Response,
  SuccessResponse,
  Security,
} from "tsoa";
import { ValidateErrorJSON } from "../exceptions/validation.error";
import { usersService } from "../services/user.service";
import { UserCreationRequest } from "../interfaces/requests/user.request";
import { UserCreationResponse } from "../models/responses/user.response";
import { UserType } from "../models/user.model";

@Route("users")
export class UserController extends Controller {

  /**
   * Creates an Instructor User with the given data.
   * @param requestBody
   * @returns Craeted instructor user's password
   */
  @Post("/instructor")
  @Security("jwt", [UserType.Admin])
  @SuccessResponse("201", "Created")
  @Response<ValidateErrorJSON>(422, "Validation Failed")
  public async createInstructorUser(
    @Body() requestBody: UserCreationRequest
  ): Promise<UserCreationResponse> {
    this.setStatus(201);
    return usersService.create(requestBody, UserType.Instructor);
  }

}