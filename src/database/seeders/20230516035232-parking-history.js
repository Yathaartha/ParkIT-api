"use strict";
const dummyData = require("../../data/previousParkings.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // let data = JSON.parse(dummyData);
    const formattedData = dummyData.map((parking) => {
      // Convert date format

      const formattedEntryTime = new Date(parking.entryTime);
      const formattedExitTime = new Date(parking.exitTime);
      const diffInMilliseconds = Math.abs(
        formattedExitTime - formattedEntryTime
      );
      const hours = diffInMilliseconds / (1000 * 60 * 60);
      const amount = parseFloat((hours * 0.5).toFixed(2));
      // Return modified parking object
      return {
        slotId: parking.slotId,
        vehicleNumber: parking.vehicleNumber,
        entryTime: formattedEntryTime.toISOString(),
        exitTime: formattedExitTime.toISOString(),
        amount: amount,
      };
    });

    queryInterface.bulkInsert("ParkingHistory", formattedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ParkingHistory", null, {});
  },
};
