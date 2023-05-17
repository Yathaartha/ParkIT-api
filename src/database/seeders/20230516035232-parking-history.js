"use strict";
const dummyData = require("../../data/previousParkings.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const formattedData = dummyData.map((parking) => {
      // Convert date format

      const formattedEntryTime = new Date(parking.entryTime);
      const formattedExitTime = new Date(parking.exitTime);
      const diffInMilliseconds = Math.abs(
        formattedExitTime - formattedEntryTime
      );
      const hours = diffInMilliseconds / (1000 * 60 * 60);
      // Return modified parking object
      return {
        slotId: parking.slotId,
        vehicleNumber: parking.vehicleNumber,
        entryTime: formattedEntryTime.toISOString(),
        exitTime: formattedExitTime.toISOString(),
        amount: 0.5 * hours,
      };
    });

    queryInterface.bulkInsert("ParkingHistory", formattedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ParkingHistory", null, {});
  },
};