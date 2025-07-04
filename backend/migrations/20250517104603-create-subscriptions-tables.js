const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("subscriptions", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    frequency: {
      type: Sequelize.ENUM("hourly", "daily"),
      allowNull: false,
    },
    confirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    confirmationToken: {
      type: Sequelize.STRING,
      unique: true,
    },
    unsubscribeToken: {
      type: Sequelize.STRING,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable("subscriptions");
}

module.exports = { up, down };
