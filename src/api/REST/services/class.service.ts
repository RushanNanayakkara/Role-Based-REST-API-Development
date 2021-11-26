import { ClassCreateRequest } from "../interfaces/requests/class.request";
import { UserCreationResponse } from "../models/responses/user.response";

class ClassService {

    public async create(_classCreateParams: ClassCreateRequest): Promise<UserCreationResponse> {
        return new UserCreationResponse("test password");
    }

}

export const classService = new ClassService();