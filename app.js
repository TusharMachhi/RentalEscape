import express from "express";
import userRoute from "./routes/user.route.js";
import { configureCors } from "./config/corsConfig.js";
import { apiVersioning } from "./utils/middleware/apiVersioning.js";
import { ApiError } from "./utils/ErorrClassAPi.js";
import { globalErrorHandler } from "./utils/globalErorrHandler.js";

const app = express();
app.use(configureCors());
app.use(express.json());
app.use(apiVersioning("v1"));

app.use("/api/v1/users", userRoute);
app.all("/{*splat}", (req, res, next) => {
  next(new ApiError(404, `${req.originalUrl} not found`));
});
app.use(globalErrorHandler);
export { app };
