import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "database",
    process.env.DB_USERNAME || process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        port: Number(process.env.DB_PORT || 3306),
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Database authenticated and connected");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });

export default sequelize;
