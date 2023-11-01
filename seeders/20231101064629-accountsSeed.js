"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("accounts", [
      {
        username: "Kim Jong Un",
        email: "Kimjongun@gmail.com",
        phone: "081335475",
        password: "Northkorea123",
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Erdogan",
        email: "Erdogan@gmail.com",
        phone: "085834848",
        password: "Turkey4567",
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Vladimir Putin",
        email: "Vladimirputin@gmail.com",
        phone: "089673673",
        password: "Rusia8095128",
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
