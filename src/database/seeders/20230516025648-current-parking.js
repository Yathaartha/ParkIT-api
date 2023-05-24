"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("CurrentParking", [
      {
        slotId: 395,
        vehicleNumber: "2XXZAHXI",
        entryTime: "2023-05-18T04:43:57.175Z",
        needCover: false,
      },
      {
        slotId: 396,
        vehicleNumber: "ZXNWN5WS",
        entryTime: "2023-05-18T04:43:57.177Z",
        needCover: false,
      },
      {
        slotId: 405,
        vehicleNumber: "TT17N55U",
        entryTime: "2023-05-18T04:43:57.178Z",
        needCover: false,
      },
      {
        slotId: 414,
        vehicleNumber: "J3ECXL3T",
        entryTime: "2023-05-18T04:43:57.182Z",
        needCover: false,
      },
      {
        slotId: 422,
        vehicleNumber: "79HMQ6Z2",
        entryTime: "2023-05-18T04:43:57.183Z",
        needCover: false,
      },
      {
        slotId: 423,
        vehicleNumber: "9DFT6VUS",
        entryTime: "2023-05-18T04:43:57.184Z",
        needCover: false,
      },
      {
        slotId: 425,
        vehicleNumber: "L4P4DT2B",
        entryTime: "2023-05-18T04:43:57.185Z",
        needCover: false,
      },
      {
        slotId: 426,
        vehicleNumber: "QYK79VDR",
        entryTime: "2023-05-18T04:43:57.187Z",
        needCover: false,
      },
      {
        slotId: 428,
        vehicleNumber: "WZS8ZPKA",
        entryTime: "2023-05-18T04:43:57.190Z",
        needCover: false,
      },
      {
        slotId: 429,
        vehicleNumber: "U9PDPFSZ",
        entryTime: "2023-05-18T04:43:57.191Z",
        needCover: false,
      },
      {
        slotId: 436,
        vehicleNumber: "DDUR0WBZ",
        entryTime: "2023-05-18T04:43:57.192Z",
        needCover: false,
      },
      {
        slotId: 439,
        vehicleNumber: "FB5OUQZ4",
        entryTime: "2023-05-18T04:43:57.194Z",
        needCover: false,
      },
      {
        slotId: 442,
        vehicleNumber: "7EHXI3VM",
        entryTime: "2023-05-18T04:43:57.197Z",
        needCover: false,
      },
      {
        slotId: 443,
        vehicleNumber: "GUJC8I3B",
        entryTime: "2023-05-18T04:43:57.198Z",
        needCover: false,
      },
      {
        slotId: 445,
        vehicleNumber: "ASBZOF99",
        entryTime: "2023-05-18T04:43:57.199Z",
        needCover: false,
      },
      {
        slotId: 447,
        vehicleNumber: "BWJAPSSC",
        entryTime: "2023-05-18T04:43:57.199Z",
        needCover: false,
      },
      {
        slotId: 453,
        vehicleNumber: "AH8CB503",
        entryTime: "2023-05-18T04:43:57.201Z",
        needCover: false,
      },
      {
        slotId: 455,
        vehicleNumber: "AC052RWO",
        entryTime: "2023-05-18T04:43:57.204Z",
        needCover: false,
      },
      {
        slotId: 456,
        vehicleNumber: "II7EPQLG",
        entryTime: "2023-05-18T04:43:57.205Z",
        needCover: false,
      },
      {
        slotId: 458,
        vehicleNumber: "OL75PMG0",
        entryTime: "2023-05-18T04:43:57.205Z",
        needCover: false,
      },
      {
        slotId: 459,
        vehicleNumber: "KH6A32B7",
        entryTime: "2023-05-18T04:43:57.205Z",
        needCover: false,
      },
      {
        slotId: 460,
        vehicleNumber: "26O7R4KF",
        entryTime: "2023-05-18T04:43:57.206Z",
        needCover: false,
      },
      {
        slotId: 461,
        vehicleNumber: "74P4BMXP",
        entryTime: "2023-05-18T04:43:57.206Z",
        needCover: false,
      },
      {
        slotId: 462,
        vehicleNumber: "6KUEUU9Q",
        entryTime: "2023-05-18T04:43:57.208Z",
        needCover: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CurrentParking", null, {});
  },
};
