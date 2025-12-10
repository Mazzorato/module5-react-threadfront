import { DataTypes } from "sequelize";
import loadSequelize from "../database.mjs";

export async function Comment() {
  const sequelize = await new loadSequelize();

  const Comment = sequelize.define("Comment", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  await Comment.create({
    content: "Super post !",
    UserId: 1,
    PostId: 1,
  });

  await Comment.create({
    content: "Super post !",
    UserId: 2,
    PostId: 2,
  });

  await Comment.create({
    content: "Nice post !",
    UserId: 3,
    PostId: 3,
  });

  await Comment.create({
    content: "Sympa ce post !",
    UserId: 4,
    PostId: 4,
  });

  await Comment.create({
    content: "J'adore ce post ! ",
    UserId: 5,
    PostId: 5,
  });

  await sequelize.sync({ force: false });

  return Comment;
}
