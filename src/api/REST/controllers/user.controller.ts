import {
  Body,
  Controller,
  Post,
  Route,
  Response,
  SuccessResponse,
  Example,
  Security,
} from "tsoa";
import { userCreateResonse } from "../util/examples/user.example.response";
import { ValidateErrorJSON } from "../interfaces/errors/validation.error";
import { usersService } from "../services/user.service";
import { UserCreationRequest } from "../interfaces/requests/user.request";
import { UserCreationResponse } from "../models/responses/user.response";
import { UserType } from "../models/user.model";

@Route("users")
export class UserController extends Controller {

  /**
   * Creates a user with the given data.
   * @param requestBody
   * @returns Craeted user with id and generated password
   */
  @Post("/instructor")
  @Security("jwt", [UserType.Admin])
  @SuccessResponse("201", "Created")
  @Example(userCreateResonse)
  @Response<ValidateErrorJSON>(422, "Validation Failed")
  public async createInstructorUser(
    @Body() requestBody: UserCreationRequest
  ): Promise<UserCreationResponse> {
    this.setStatus(201);
    return usersService.create(requestBody, UserType.Instructor);
  }

}