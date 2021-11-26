import { ClassModule } from "../util/constants";

class ModuleService {

  public async getForUser(userId:String): Promise<ClassModule[]> {
    console.log(userId);
    return [ClassModule.FACE_DETECT,ClassModule.IMAGE_PROCESSING]
  }
}

export const moduleService = new ModuleService();