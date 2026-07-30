import { Table, Column, Model, DataType, PrimaryKey, Default, AllowNull } from "sequelize-typescript";

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
        allowNull:false
    })
    username!: string;

    @Column({
        type: DataType.STRING,
         allowNull:false
    })
    password!: string;

    @Column({
        type: DataType.STRING,
         allowNull:false,
         unique:true
    })
    email!: string;

    @Column({
        type: DataType.ENUM('teacher', 'institute', 'super-admin', 'student'),
        defaultValue: 'student',
    })
    role!: string;
}