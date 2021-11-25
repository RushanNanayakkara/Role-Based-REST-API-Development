import { User, UserCreationParams, UserType } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';

export class UsersService {

  public get(id: string, name?: string): User {
    return {
      id,
      password: "test password",
      name: name ?? "Rushan Nanayakkara",
      type: UserType.Admin
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: uuidv4(),
      password: "testpass",
      ...userCreationParams,
      type: UserType.Admin
    };
  }
}