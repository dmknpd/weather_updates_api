const { Umzug, SequelizeStorage } = require("umzug");
const { sequelize } = require("../models");

const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const runMigrations = async () => {
  console.log("Running migrations...");
  const pendingMigrations = await umzug.pending();
  console.log(
    "Pending migrations:",
    pendingMigrations.map((m) => m.name)
  );
  await umzug.up();
  console.log("Migrations applied");
};

module.exports = {
  runMigrations,
};
