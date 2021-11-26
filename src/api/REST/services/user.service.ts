import { AdminUser, UserBase, UserType } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import { UserCreationRequest } from "../interfaces/requests/user.request";
import { generatePassword } from "../helpers/password.helper";
import { UserCreationResponse } from "../models/responses/user.response";

class UsersService {

  public async create(_userCreationParams: UserCreationRequest, _userType: UserType): Promise<UserCreationResponse> {
    const password: string = generatePassword();
    // const hashedPassword:string =  await bcrypt.hash(password,Bcrypt_Salt);
    // todo: complete user creation
    return new UserCreationResponse(password);
  }

  public get(username: string): UserBase {
    return new AdminUser(
      uuidv4(),
      username,
      "$2a$10$0mj06IJ0/wMOXAWwP2mWbuiPKp42GxuUv7f9FIgDn1kDE9jZb8ZZK",
      UserType.Instructor,
    );
  }
}

export const usersService = new UsersService();