import { Table, Column, Model, PrimaryKey, Unique } from 'sequelize-typescript'
import { UserType } from '../../models/user.model';

@Table({
    timestamps: true
})
export class User extends Model{
    @PrimaryKey
    @Column
    id!: string;

    @Unique
    @Column
    name!: string;

    @Column
    password!: string;

    @Column
    type!: UserType;
}