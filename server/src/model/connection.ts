import { config } from "dotenv";
import { Sequelize } from "sequelize-typescript";
import User from "./user.model";

config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME || "database",
    username: process.env.DB_USERNAME || process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: Number(process.env.DB_PORT || 3306),
    models: [User],
});

sequelize
    .authenticate()
    .then(() => sequelize.sync())
    .then(() => {
        console.log("Database authenticated and tables created");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });

export default sequelize;
