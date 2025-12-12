import { sequelize } from "../config/database.mjs";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
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

      set(clearPassword) {
        const hashedPassword = bcrypt.hashSync(clearPassword, 10);
        this.setDataValue("password", hashedPassword);
      },
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);
