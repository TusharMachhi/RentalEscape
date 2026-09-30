import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validateZod } from "../utils/validations/zodValidation.js";
import { auth } from "../utils/middleware/auth.js";
import {
  registerSchema,
  loginUserSchema,
} from "../utils/validations/schemas/user/userSchema.js";
import {
  register,
  loginUser,
  uploadProfileImage,
  refresAceeshToken,
  getAllUser,
  logoutUser,
  getUserById,
  deleteUser,
} from "../controllers/user.controller.js";
import { uploadfile } from "../utils/middleware/multer.js";

const router = express.Router();

router
  .route("/create-user")
  .post(validateZod(registerSchema), asyncHandler(register));

router
  .route("/login-user")
  .post(validateZod(loginUserSchema), asyncHandler(loginUser));

router.route("/logout-user").post(auth, asyncHandler(logoutUser));

router.route("/refresh-accesstoken").post(asyncHandler(refresAceeshToken));

router.route("/getall-users").get(asyncHandler(getAllUser));
router.route("/get-user/:id").get(asyncHandler(getUserById));
router.route("/delete-user").delete(auth, asyncHandler(deleteUser));

router
  .route("/upload-profile")
  .patch(auth, uploadfile.single("profile"), asyncHandler(uploadProfileImage));

export default router;
