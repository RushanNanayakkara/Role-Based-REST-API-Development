import { ClassModuleSequille } from "../db/models/class.module.sequilize";
import { Student } from "../db/models/student.sequlize";
import { User } from "../db/models/user.sequlize";
import { classModuleEnumFromValue } from "../helpers/enum.helper";
import { NotFoundError } from "../exceptions/notfound.error";
import { ExecutedModule } from "../models/responses/module.response";
import { UserType } from "../models/user.model";
import { ClassModule } from "../util/constants";

class ModuleService {

  public async getForUser(userId: string): Promise<ClassModule[]> {
    const user: User | null = await User.findOne({
      where: { id: userId }
    })

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.type === UserType.Admin || user.type === UserType.Instructor) {
      return [ClassModule.FACE_DETECT, ClassModule.IMAGE_PROCESSING, ClassModule.VOICE_REC];
    }

    const studentUser: Student | null = await Student.findOne({
      where: { userId: userId }
    })

    const classModuleSequilles: ClassModuleSequille[] = await ClassModuleSequille.findAll({
      where: { classId: studentUser?.classId }
    });

    let classModules: ClassModule[] = [];
    classModuleSequilles.forEach(classMod => {
      const res = classModuleEnumFromValue(classMod.module)
      if (res) {
        classModules.push(res)
      }
    });
    return classModules;
  }

  public async executeModule(module: ClassModule): Promise<ExecutedModule> {
    return new ExecutedModule(`Hello Module ${module}`);
  }
}

export const moduleService = new ModuleService();