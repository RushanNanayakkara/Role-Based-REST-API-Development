import { UserBase, UserType } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import { UserCreationRequest } from "../interfaces/requests/user.request";
import { generatePassword } from "../helpers/password.helper";
import { UserCreationResponse } from "../models/responses/user.response";
import bcrypt from 'bcrypt'
import { Bcrypt_Salt_Rounds } from "../util/constants";
import { User } from "../db/models/user.sequlize";
import { DuplicateEntry } from "../exceptions/invaliddata.error";
import { NotFoundError } from "../exceptions/notfound.error";

class UsersService {

  public async create(userCreationParams: UserCreationRequest, userType: UserType): Promise<UserCreationResponse> {
    const password: string = generatePassword();
    await this.createWithPassword(userCreationParams, password, userType);
    return new UserCreationResponse(password);
  }

  public async createWithPassword(userCreationParams: UserCreationRequest, password: string, userType: UserType): Promise<UserBase> {
    const hashedPassword: string = await bcrypt.hash(password, Bcrypt_Salt_Rounds);

    const newUser = await User.create({
      id: uuidv4(),
      name: userCreationParams.name.toLowerCase(),
      password: hashedPassword,
      type: userType
    })
      .catch(err => {
        console.error(err.message);
        if (err.name === "SequelizeUniqueConstraintError") {
          throw new DuplicateEntry("Name already exists"); //todo: return duplicate name
        }
        throw new Error("Error creating user");
      })

    return {
      id: newUser.id,
      name: newUser.name,
      type: newUser.type,
      password: newUser.password
    } as UserBase;
  }

  public async get(username: string): Promise<UserBase> {
    return User.findOne({
      where: { name: username.toLowerCase() }
    }).then(user => {
      if (user == null) {
        throw new NotFoundError("User not found");
      }
      return {
        id: user.id,
        name: user.name,
        password: user.password,
        type: user.type
      } as UserBase;
    })
  }

  public async getById(userId: string): Promise<UserBase> {
    return User.findOne({
      where: { id: userId }
    }).then(user => {
      if (user == null) {
        throw new NotFoundError("User not found");
      }
      return {
        id: user.id,
        name: user.name,
        password: user.password,
        type: user.type
      } as UserBase;
    })
  }
}

export const usersService = new UsersService();