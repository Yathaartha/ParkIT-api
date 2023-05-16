import { Sequelize } from "sequelize";
import { sequelize } from "../../database/db.js";

export const CurrentParking = sequelize.define(
  "CurrentParking",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    slotId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    vehicleNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    entryTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
