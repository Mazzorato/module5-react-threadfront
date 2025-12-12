import { sequelize } from "../config/database.mjs";
import { DataTypes } from "sequelize";

import { User } from "./UserModel.mjs";
import { Post } from "./PostModel.mjs";


export const Comment = sequelize.define(
  "Comment", 
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
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
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
      onDelete: "RESTRICT",
    },
  },
  {
    tableName: "comments",
    timestamps: true,
  }
);

User.hasMany(Comment, {
  foreignKey: { name: "user_id", allowNull: false },
  as: "comments",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Comment.belongsTo(User, {
  foreignKey: { name: "user_id", allowNull: false },
  as: "user"
})

Post.hasMany(Comment, {
  foreignKey: { name: "post_id", allowNull: false },
  as: "comments",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

Comment.belongsTo(Post, {
  foreignKey: { name: "post_id", allowNull: false },
  as: "post"
})
