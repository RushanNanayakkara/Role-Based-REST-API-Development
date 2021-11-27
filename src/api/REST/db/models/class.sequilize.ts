import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript'


@Table({
    timestamps: true
})
export class SequilizeClass extends Model {
    @PrimaryKey
    @Column
    id!: string;

    @Column
    modules!: string;

    @Column
    password!: string;
}