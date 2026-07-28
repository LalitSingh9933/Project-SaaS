import { Table, Column, Model, DataType, PrimaryKey, Default } from "sequelize-typescript";

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: true
})
export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
    })
    id!: string;

    @Column({
        type: DataType.STRING,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
    })
    email!: string;

    @Column({
        type: DataType.ENUM('teacher', 'institute', 'super-admin', 'student'),
        defaultValue: 'student',
    })
    role!: string;
}