import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { SequilizeClass } from './class.sequilize'


@Table({
    timestamps: true
})
export class ClassModuleSequille extends Model{
    
    @ForeignKey(() => SequilizeClass)
    @PrimaryKey
    @Column
    classId!:string

    @BelongsTo(() => SequilizeClass)
    class!: SequilizeClass

    @PrimaryKey
    @Column
    module!:string

}