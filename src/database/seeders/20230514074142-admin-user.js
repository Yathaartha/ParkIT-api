"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User", [
      {
        username: "admin",
        password: "admin",
        name: "Yathaartha",
        email: "yathaartha@gmail.com",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("User", null, {});
  },
};
