import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: "localhost",
  port: "5432",
  dialect: "postgres",
  username: "admin",
  password: "secret",
  database: "parkit",
});
