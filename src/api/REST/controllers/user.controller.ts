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

@Route("users") 
export class UsersController extends Controller {

  /**
   * Creates a user with the given data. 
   * @param requestBody  
   * @returns Craeted user with id and generated password
   */
  @Post()   
  @Security("jwt")
  @SuccessResponse("201", "Created") 
  @Example(userCreateResonse)
  @Response<ValidateErrorJSON>(422, "Validation Failed")
  public async createUser(
    @Body() requestBody: UserCreationRequest
  ): Promise<UserCreationResponse> {
    this.setStatus(201);
    const createdUser = usersService.create(requestBody);
    return new UserCreationResponse(createdUser);
  }
}