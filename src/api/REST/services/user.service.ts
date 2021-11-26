import { AdminUser, UserBase, UserType } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import { UserCreationRequest } from "../interfaces/requests/user.request";

class UsersService {

  public create(userCreationParams: UserCreationRequest): UserBase {
    return new AdminUser(
      uuidv4(),
      userCreationParams.name,
      "$2a$10$W2cr7YCvYxlwicl.Ce0pUuQEuVqSGrO9CO07Fe8g9NS7SCJuNpmeC",
      UserType.Admin,
    );
  }

  public get(username:String): UserBase {
    console.log(username);
    return new AdminUser(
      uuidv4(),
      "Rushan",
      "$2a$10$W2cr7YCvYxlwicl.Ce0pUuQEuVqSGrO9CO07Fe8g9NS7SCJuNpmeC",
      UserType.Admin,
    );
  }
}

export const usersService = new UsersService();