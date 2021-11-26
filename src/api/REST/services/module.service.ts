import { ClassModule } from "../util/constants";

class ModuleService {

  public getForUser(userId:String): ClassModule[] {
    console.log(userId);
    return [ClassModule.FACE_DETECT,ClassModule.IMAGE_PROCESSING]
  }
}

export const moduleService = new ModuleService();