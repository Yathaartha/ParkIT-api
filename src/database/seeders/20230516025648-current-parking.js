"use strict";
const data = require("../../data/previousParkings.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("CurrentParking", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CurrentParking", null, {});
  },
};
