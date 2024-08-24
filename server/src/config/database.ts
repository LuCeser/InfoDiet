import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path"

dotenv.config();

const dbPath = path.join(__dirname, '..', '..', 'db.sqlite')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DATABASE_URL || dbPath,
});

export default sequelize;
