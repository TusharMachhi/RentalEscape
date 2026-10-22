import multer from "multer";
import fs from "fs";
import path from "path";
import { logger } from "../../config/logger.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const orgName = file.originalname;

    const paresedFile = path.parse(orgName);
    const filename = paresedFile.name;
    const ext = paresedFile.ext;

    const uniqueSuffix = Date.now();

    cb(null, filename + "-" + uniqueSuffix + ext);
  },
});

export const uploadfile = multer({ storage: storage });
