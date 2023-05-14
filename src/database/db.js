import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: process.env.PGHOST,
  port: "5432",
  dialect: "postgres",
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});
