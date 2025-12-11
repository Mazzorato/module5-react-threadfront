import { sequelize } from "../config/database.mjs";
import { DataTypes } from "sequelize";

import { User } from "./User.model.mjs";

export const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Veuillez remplir ce champ" },
        len: { args: [1, 200], msg: "1 a 200 caractères" },
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Veuillez remplir ce champ" },
        len: { args: [1, 400], msg: "1 a 400 caractères" },
      },
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "RESTRICT",
    },
  },
  {
    tableName: "posts",
    timestamps: true,
  }
);

User.hasMany(Post, {
  foreignKey: { name: "user_id", allowNull: false },
  as: "posts",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Post.belongsTo(User, {
  foreignKey: { name: "user_id", allowNull: false },
  as: "user"
})
