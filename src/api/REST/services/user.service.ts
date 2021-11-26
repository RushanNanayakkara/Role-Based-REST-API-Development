import { AdminUser, UserBase, UserType } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import { UserCreationRequest } from "../interfaces/requests/user.request";
import { generatePassword } from "../helpers/password.helper";
import { UserCreationResponse } from "../models/responses/user.response";
import bcrypt from 'bcrypt'
import { Bcrypt_Salt_Rounds } from "../util/constants";
import { User } from "../db/models/user.sequlize";
import { DuplicateEntry } from "../interfaces/errors/invaliddata.error";

class UsersService {

  public async create(userCreationParams: UserCreationRequest, userType: UserType): Promise<UserCreationResponse> {
    const password: string = generatePassword();
    const hashedPassword:string =  await bcrypt.hash(password,Bcrypt_Salt_Rounds);
    // todo: complete user creation

    await User.create({
      id:uuidv4(),
      name:userCreationParams.name,
      password:hashedPassword,
      type: userType
    })
    .catch(err=>{
      console.error(err.message);
      if(err.name==="SequelizeUniqueConstraintError"){
        throw new DuplicateEntry("Name already exists");
      }
      throw new Error("Error creating user");
    }) 
 
    return new UserCreationResponse(password);
  }

  public get(username: string): UserBase {
    return new AdminUser( 
      uuidv4(),
      username,  
      "$2a$10$0mj06IJ0/wMOXAWwP2mWbuiPKp42GxuUv7f9FIgDn1kDE9jZb8ZZK",
      UserType.Admin,
    );
  }
}

export const usersService = new UsersService();