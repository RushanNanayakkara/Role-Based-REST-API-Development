import { AdminUser, UserBase, UserType } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import { UserCreationRequest } from "../interfaces/requests/user.request";

class UsersService {

  public create(userCreationParams: UserCreationRequest): UserBase {
    return new AdminUser(
      uuidv4(),
      userCreationParams.name,
      "$2a$10$0mj06IJ0/wMOXAWwP2mWbuiPKp42GxuUv7f9FIgDn1kDE9jZb8ZZK",
      UserType.Admin,
    );
  }

  public get(username:string): UserBase {
    console.log(username);
    return new AdminUser(
      uuidv4(),
      username,
      "$2a$10$0mj06IJ0/wMOXAWwP2mWbuiPKp42GxuUv7f9FIgDn1kDE9jZb8ZZK",
      UserType.Admin,
    );
  }
}

export const usersService = new UsersService();