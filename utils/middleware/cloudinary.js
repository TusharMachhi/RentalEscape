import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs/promises";

import { ApiError } from "../ErorrClassAPi.js";
import { logger } from "../../config/logger.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async ({
  localPath,
  folder,
  resourceType = "auto",
}) => {
  if (!localPath) {
    throw new ApiError(500, "Local media file path is required");
  }

  if (!folder) {
    throw new ApiError(500, "Cloudinary folder is required");
  }

  try {
    logger.debug("Starting media upload to Cloudinary", {
      provider: "cloudinary",
      operation: "media_upload",
    });

    const result = await cloudinary.uploader.upload(localPath, {
      resource_type: resourceType,
      folder,
    });

    logger.info("Media uploaded to Cloudinary", {
      provider: "cloudinary",
      operation: "media_upload",
      publicId: result.public_id,
      resourceType: result.resource_type,
      format: result.format,
      bytes: result.bytes,
    });

    return result;
  } catch (error) {
    logger.error("Cloudinary media upload failed", {
      provider: "cloudinary",
      operation: "media_upload",
      message: error.message,
      error: error,
      stack: error.stack,
    });
    console.log("ERROR", error);

    throw new ApiError(500, "Failed to upload media to Cloudinary");
  } finally {
    try {
      await fs.unlink(localPath);

      logger.debug("Temporary media file removed", {
        operation: "media_cleanup",
      });
    } catch (error) {
      logger.warn("Failed to remove temporary media file", {
        operation: "media_cleanup",
        message: error.message,
      });
    }
  }
};
