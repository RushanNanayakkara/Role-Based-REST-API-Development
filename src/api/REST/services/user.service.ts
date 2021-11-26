import { UserBase, UserType } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import { UserCreationRequest } from "../interfaces/requests/user.request";
import { generatePassword } from "../helpers/password.helper";
import { UserCreationResponse } from "../models/responses/user.response";
import bcrypt from 'bcrypt'
import { Bcrypt_Salt_Rounds } from "../util/constants";
import { User } from "../db/models/user.sequlize";
import { DuplicateEntry } from "../interfaces/errors/invaliddata.error";
import { NotFoundError } from "../interfaces/errors/notfound.error";

class UsersService {

  public async create(userCreationParams: UserCreationRequest, userType: UserType): Promise<UserCreationResponse> {
    const password: string = generatePassword();
    const hashedPassword:string =  await bcrypt.hash(password,Bcrypt_Salt_Rounds);

    await User.create({
      id:uuidv4(),
      name:userCreationParams.name.toLowerCase(),
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

  public async get(username: string): Promise<UserBase> {
    return User.findOne({
      where:{name:username.toLowerCase()}
    }).then(user=>{
      if(user==null){
        throw new NotFoundError("User not found");
      }
      return {
        id:user.id,
        name:user.name,
        password:user.password,
        type:user.type
      } as UserBase;
    })
  }
}

export const usersService = new UsersService();