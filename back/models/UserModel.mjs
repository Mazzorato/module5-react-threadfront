import { Sequelize, DataTypes } from "sequelize";
import { loadSequelize } from "../config/database.mjs";
// import { getUserController } from "../controllers/UserControllers.mjs";


export async function UserModel() {
  const sequelize = await loadSequelize();

  sequelize.define("User", {
    username: DataTypes.STRING,
    allowNull: false,
    unique: true,

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  await User.create({
    username: "user1",
    email: "user@gmail.com",
    password: "foreveruser",
  });

  await User.create({
    username: "user2",
    email: "user2@gmail.com",
    password: "foreveruser",
  });

  await User.create({
    username: "user3",
    email: "user3@gmail.com",
    password: "foreveruser",
  });

  await User.create({
    username: "user4",
    email: "user4@gmail.com",
    password: "foreveruser",
  });

  await User.create({
    username: "user5",
    email: "user5@gmail.com",
    password: "foreveruser",
  });

  await sequelize.sync({ force: false });

  return sequelize;
}
