import {
    Body,
    Controller,
    Post,
    Route,
    Response,
    SuccessResponse,
  } from "tsoa";
import { ValidateErrorJSON } from "../interfaces/errors/validation.error";
import { UserCreationParams } from "../models/user.model";
import { UsersService } from "../services/user.service";
  
  @Route("users")
  export class UsersController extends Controller {

    /**
     * Creates a user with the given data. 
     * @param requestBody 
     * @returns Craeted user with id and generated password
     */
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("201", "Created") 
    @Post()
    public async createUser(
      @Body() requestBody: UserCreationParams
    ): Promise<void> {
      this.setStatus(201);
      new UsersService().create(requestBody);
      return;
    }
  }