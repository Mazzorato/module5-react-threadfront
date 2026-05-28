import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { sequelize, testDBConnection } from "./config/database.mjs";
import postRouter from "./routes/PostRoutes.mjs";
import userRouter from "./routes/UserRoutes.mjs";
import commentRouter from "./routes/CommentRoutes.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8089"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use("/", userRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);

async function main() {
  try {
    await testDBConnection();
    await sequelize.sync();

    app.listen(3000, () => {
      console.log(`Serveur lancé sur le port : 3000`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
