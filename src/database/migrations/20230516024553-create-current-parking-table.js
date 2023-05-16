"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("CurrentParking", {
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
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("CurrentParking");
  },
};
