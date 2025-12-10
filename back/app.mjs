import { getUserController } from "./controllers/UserControllers.mjs"



app = express()


app.use("/user",getUserController(app));
