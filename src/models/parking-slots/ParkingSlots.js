import { Sequelize } from "sequelize";
import { sequelize } from "../../database/db";

export const ParkingSlots = sequelize.define(
  "ParkingSlots",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    laneNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    slotNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    distanceFromEntry: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
