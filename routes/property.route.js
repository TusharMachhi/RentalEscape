import express from "express";
import { auth } from "../utils/middleware/auth.js";
import { roleAuth } from "../utils/middleware/roleAuthrization.js";
import { uploadfile } from "../utils/middleware/multer.js";
import { createProperty } from "../controllers/property.controller.js";
import { validateZod } from "../utils/validations/zodValidation.js";
import { createPropertySchema } from "../utils/validations/schemas/property/propertySchema.js";
import { parseJsonFields } from "../utils/middleware/nestedBodyjsonParser.js";

const router = express.Router();

router.route("/create-property").post(
  auth,
  roleAuth("host"),
  uploadfile.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  parseJsonFields([
    "location",
    "guests",
    "amenities",
    "pricing",
    "bookingRules",
    "houseRules",
  ]),
  validateZod(createPropertySchema),
  createProperty,
);

export default router;
