import { Sequelize } from "sequelize";
import { sequelize } from "../../database/db.js";
import { ParkingSlots } from "../parking-slots/ParkingSlots.js";

export const ParkingHistory = sequelize.define(
  "ParkingHistory",
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
    exitTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

ParkingHistory.belongsTo(ParkingSlots, {
  foreignKey: "slotId",
  targetKey: "id",
  as: "parkingSlot",
});
