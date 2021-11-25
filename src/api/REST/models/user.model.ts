export enum UserType{
  Admin,
  Instructor,
  Student
}
export interface User {
    id: string;
    name: string;
    password: string;
    type: UserType
  }


export type UserCreationParams = Pick<User, "name" >;