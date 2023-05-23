"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("ParkingHistory", {
      fields: ["slotId"],
      type: "foreign key",
      name: "slotId_fk",
      references: {
        table: "ParkingSlots",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("ParkingHistory", "slotId_fk");
  },
};
