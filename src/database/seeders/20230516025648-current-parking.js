"use strict";
const dummyData = require("../../data/previousParkings");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const formattedData = dummyData.map((parking) => {
      // Convert date format

      const formattedEntryTime = new Date(parking.entryTime);
      const formattedExitTime = new Date(parking.exitTime);
      // Return modified parking object
      return {
        slotId: parking.slotId,
        vehicleNumber: parking.vehicleNumber,
        entryTime: formattedEntryTime,
        exitTime: formattedExitTime,
      };
    });

    queryInterface.bulkInsert("CurrentParking", formattedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CurrentParking", null, {});
  },
};
