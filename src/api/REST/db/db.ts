import { Sequelize } from 'sequelize-typescript'
import { sequlizeModels } from './models'
import { User } from './models/user.sequlize'
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../models/user.model';
import bcrypt from 'bcrypt'
import { Bcrypt_Salt_Rounds } from '../util/constants';

if(
    !process.env.DB_DATABASE ||
    !process.env.DB_DIALECT ||
    !process.env.DB_USERNAME ||
    !process.env.DB_PASSWORD
){
    throw new Error
}

export const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: sequlizeModels
});

bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD||"1234", Bcrypt_Salt_Rounds)
    .then(hashedPassword => {
        User.findOrCreate({
            where: {
                type: UserType.Admin
            },
            defaults: {
                id: uuidv4(),
                name: process.env.DEFAULT_ADMIN_USERNAME||"admin",
                password: hashedPassword,
                type: UserType.Admin
            }

        })
    })

