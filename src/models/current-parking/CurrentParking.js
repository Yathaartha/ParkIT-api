import { Sequelize } from "sequelize";
import { sequelize } from "../../database/db.js";
import { ParkingSlots } from "../parking-slots/ParkingSlots.js";

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
    estimatedExit: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

CurrentParking.belongsTo(ParkingSlots, {
  foreignKey: "slotId",
});
