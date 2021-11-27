import { Table, Column, ForeignKey, BelongsTo, Model, PrimaryKey } from 'sequelize-typescript'
import { SequilizeClass } from './class.sequilize';
import { User } from './user.sequlize';

@Table({
    timestamps: true
})
export class Student extends Model {

    @ForeignKey(() => User)
    @PrimaryKey
    @Column
    userId!: string

    @BelongsTo(() => User)
    user!: User

    @ForeignKey(() => SequilizeClass)
    @Column
    classId!: string

    @BelongsTo(() => SequilizeClass)
    class!: SequilizeClass

}