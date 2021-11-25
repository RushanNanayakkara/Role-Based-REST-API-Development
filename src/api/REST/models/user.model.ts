export interface User {
    id: string;
    name: string;
    password: string;
  }


export type UserCreationParams = Pick<User, "name" >;