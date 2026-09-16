import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateZod } from "../utils/validations/zodValidation.js";
import { registerSchema } from "../utils/validations/schemas/user/userSchema.js";
import {
  register,
  uploadProfileImage,
} from "../controllers/user.controller.js";
import { uploadfile } from "../utils/middleware/multer.js";

const router = express.Router();

router
  .route("/create-user")
  .post(validateZod(registerSchema), asyncHandler(register));

router
  .route("/upload-profile")
  .post(uploadfile.single("profile"), asyncHandler(uploadProfileImage));

export default router;
