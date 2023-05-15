"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(
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
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("ParkingSlots");
  },
};
