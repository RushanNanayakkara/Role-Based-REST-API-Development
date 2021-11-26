import { UserCreationResponse } from "../../models/responses/user.response";
import { InstructorUser, UserType } from "../../models/user.model";

const instructorUser = new InstructorUser(
    "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    "InstructorExample",
    "2b0d7b3dcb",
    UserType.Instructor
    );

export const userCreateResonse: UserCreationResponse = new UserCreationResponse(instructorUser);
