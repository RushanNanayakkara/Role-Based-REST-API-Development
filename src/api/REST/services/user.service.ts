import { AdminUser, UserBase, UserType } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import { UserCreationRequest } from "../interfaces/requests/usercreation.request";

class UsersService {

  public create(userCreationParams: UserCreationRequest): UserBase {
    return new AdminUser(
      uuidv4(),
      userCreationParams.name,
      "testpass",
      UserType.Admin,
    );
  }
}

export const usersService = new UsersService();