import { ExecutedModule } from "../models/responses/module.response";
import { ClassModule } from "../util/constants";

class ModuleService {

  public async getForUser(userId:String): Promise<ClassModule[]> {
    console.log(userId);
    return [ClassModule.FACE_DETECT,ClassModule.IMAGE_PROCESSING]
  }

  public async executeModule(module:ClassModule): Promise<ExecutedModule> {
    return new ExecutedModule(`Hello Module ${module}`);
  }
}

export const moduleService = new ModuleService();