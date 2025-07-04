module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define("subscription", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
        notEmpty: {
          msg: "Email cannot be empty",
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "City cannot be empty",
        },
      },
    },
    frequency: {
      type: DataTypes.ENUM("hourly", "daily"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["hourly", "daily"]],
          msg: "Frequency must be either 'hourly' or 'daily'",
        },
      },
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    confirmationToken: {
      type: DataTypes.STRING,
      unique: true,
    },
    unsubscribeToken: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  return Subscription;
};
