import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
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
     * 
     * @param requestBody 
     * @returns 
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