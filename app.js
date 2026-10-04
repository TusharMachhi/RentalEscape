import express from "express";
import userRoute from "./routes/user.route.js";
import categoryRoute from "./routes/category.route.js";
import propertyRoute from "./routes/property.route.js";
import { configureCors } from "./config/corsConfig.js";
import { apiVersioning } from "./utils/middleware/apiVersioning.js";
import { ApiError } from "./utils/ErorrClassAPi.js";
import { globalErrorHandler } from "./utils/globalErorrHandler.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(configureCors());
app.use(express.json());
app.use(cookieParser());
app.use(apiVersioning("v1"));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/property", propertyRoute);
app.all("/{*splat}", (req, res, next) => {
  next(new ApiError(404, `${req.originalUrl} not found`));
});
app.use(globalErrorHandler);
export { app };
