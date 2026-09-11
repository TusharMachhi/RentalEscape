import express from "express";
import userRoute from "./routes/user.route.js";
import { configureCors } from "./config/corsConfig.js";
import { apiVersioning } from "./utils/middleware/apiVersioning.js";

const app = express();
app.use(configureCors());
app.use(express.json());
app.use(apiVersioning("v1"));

app.use("/api/v1/users", userRoute);

export { app };
