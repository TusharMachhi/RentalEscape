import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadfile } from "../utils/middleware/multer.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { validateZod } from "../utils/validations/zodValidation.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../utils/validations/schemas/category/categorySchema.js";
import { auth } from "../utils/middleware/auth.js";
import { roleAuth } from "../utils/middleware/roleAuthrization.js";

const router = express.Router();

router
  .route("/create-category")
  .post(
    auth,
    roleAuth("admin", "host"),
    uploadfile.single("image"),
    validateZod(createCategorySchema),
    asyncHandler(createCategory),
  );

router.route("/getall-catergories").get(asyncHandler(getAllCategories));
router.route("/get-category/:id").get(asyncHandler(getCategory));
router
  .route("/delete-category/:id")
  .delete(auth, roleAuth("admin"), asyncHandler(deleteCategory));
router
  .route("/update-category/:id")
  .patch(
    auth,
    roleAuth("admin"),
    uploadfile.single("image"),
    validateZod(updateCategorySchema),
    asyncHandler(updateCategory),
  );

export default router;
