import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateZod } from "../utils/validations/zodValidation.js";
import { registerSchema } from "../utils/validations/schemas/user/userSchema.js";
import { register } from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/create-user")
  .post(validateZod(registerSchema), asyncHandler(register));

export default router;
