import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { sequelize, testDBConnection } from "./config/database.mjs";
import postRouter from "./routes/Post.routes.mjs";
//import userRouter from "./routes/userRoute.mjs";
//import commentRouter from "./routes/commentRoute.mjs"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//app.use("/users", userRouter)
//app.use("/comments", commentRouter);
app.use('/posts', postRouter);


async function main() {
    try {
        await testDBConnection();
        await sequelize.sync();

        app.listen(3000, () => {
            console.log(`Serveur lancé sur le port : 3000`)
        })

    } catch (err) {
        console.error(err)
    }
}

main();