import { Sequelize } from 'sequelize-typescript'
import { sequlizeModels } from './models'
import { User } from './models/user.sequlize'
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../models/user.model';
import bcrypt from 'bcrypt'
import { Bcrypt_Salt_Rounds } from '../util/constants';

export const sequelize = new Sequelize({
    database: 'xeptclass',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    models: sequlizeModels
});

bcrypt.hash("1234",Bcrypt_Salt_Rounds)
.then(hashedPassword=>{
    User.findOrCreate({
        where: {
            type: UserType.Admin
        },
        defaults:{
            id:uuidv4(),
            name: "admin",
            password: hashedPassword,
            type: UserType.Admin
        }
    
    })
})

