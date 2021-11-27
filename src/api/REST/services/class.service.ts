import { sequelize } from "../db/db";
import { SequilizeClass } from "../db/models/class.sequilize";
import { generatePassword } from "../helpers/password.helper";
import { ClassCreateRequest } from "../interfaces/requests/class.request";
import { UserType } from "../models/user.model";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Student } from "../db/models/student.sequlize";
import { User } from "../db/models/user.sequlize";
import { Bcrypt_Salt_Rounds } from "../util/constants";
import { ClassModuleSequille } from "../db/models/class.module.sequilize";
import { DuplicateEntry } from "../interfaces/errors/invaliddata.error";
import { ClassCreationResponse } from "../models/responses/class.response";

class ClassService {

    public async create(classCreateParams: ClassCreateRequest): Promise<ClassCreationResponse> {
        const t = await sequelize.transaction();
        try {
            const password: string = generatePassword();
            const hashedPassword: string = await bcrypt.hash(password, Bcrypt_Salt_Rounds);
            const userPromises: Promise<User | void>[] = [];

            const savedClass: SequilizeClass = await SequilizeClass.create({
                id: uuidv4(),
                modules: classCreateParams.modules[0],
                password: hashedPassword
            })

            classCreateParams.modules.forEach(module => {
                ClassModuleSequille.create({
                    classId: savedClass.id,
                    class: savedClass,
                    module: module
                })
            });

            classCreateParams.students.forEach(
                stdName => {
                    userPromises.push(User.create({
                        id: uuidv4(),
                        name: stdName,
                        type: UserType.Student,
                        password: hashedPassword,
                    } as User).then(user => {
                        Student.create(
                            {
                                userId: user.id,
                                classId: savedClass.id,
                                user: user,
                                class: savedClass
                            } as Student
                        );
                    }))
                });

            await Promise.all(userPromises);

            t.commit;
            return new ClassCreationResponse(password);
        }
        catch (err: any) {
            console.error(err.message);
            t.rollback();
            if (err.name === "SequelizeUniqueConstraintError") {
                throw new DuplicateEntry("Name already exists"); //todo: return duplicate name
            }
            throw err;
        }
    }

}

export const classService = new ClassService();