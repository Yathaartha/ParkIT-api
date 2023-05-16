"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("CurrentParking", [
      {
        slotId: 147,
        vehicleNumber: "R5M9M87I",
        entryTime: "2023-05-16T04:29:49.930Z",
      },
      {
        slotId: 156,
        vehicleNumber: "FSRX0TEV",
        entryTime: "2023-05-16T04:29:49.932Z",
      },
      {
        slotId: 159,
        vehicleNumber: "SSL02HNR",
        entryTime: "2023-05-16T04:29:49.933Z",
      },
      {
        slotId: 176,
        vehicleNumber: "536VY8DV",
        entryTime: "2023-05-16T04:29:49.933Z",
      },
      {
        slotId: 180,
        vehicleNumber: "1LNT8WUR",
        entryTime: "2023-05-16T04:29:49.934Z",
      },
      {
        slotId: 191,
        vehicleNumber: "PMYRDWDI",
        entryTime: "2023-05-16T04:29:49.934Z",
      },
      {
        slotId: 201,
        vehicleNumber: "QT6I1L6P",
        entryTime: "2023-05-16T04:29:49.935Z",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CurrentParking", null, {});
  },
};
