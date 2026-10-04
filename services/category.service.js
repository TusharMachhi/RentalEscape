import { logger } from "../config/logger.js";
import { categoryRepo } from "../repositories/categoryRepo.js";

import { ApiError } from "../utils/ErorrClassAPi.js";
import { uploadToCloudinary } from "../utils/middleware/cloudinary.js";

export const categoryService = {
  createCategory: async (data, file) => {
    const existingCategory = await categoryRepo.findCategory(data.name);

    if (existingCategory) {
      throw new ApiError(409, "category already existing");
    }

    const { public_id, secure_url } = await uploadToCloudinary({
      localPath: file,
      folder: `EscapeRental/category/${data.name}/images`,
      resourceType: "image",
    });

    const catData = {
      image: { publicId: public_id, secureUrl: secure_url },
      name: data.name,
      description: data.description,
    };

    return await categoryRepo.create(catData);
  },

  getCategory: async (id) => {
    if (!id) {
      throw new ApiError(404, "category id not found");
    }

    return await categoryRepo.findById(id);
  },
  getAllCategories: async () => {
    return await categoryRepo.find({ isActive: true });
  },

  updateCategory: async ({ id, path, data }) => {
    logger.info("Updating category", {
      id,
      hasImage: Boolean(path),
      data,
    });
    if (!id) {
      throw new ApiError(404, "category id not found");
    }

    const catData = {
      name: data.name,
      description: data.description,
    };

    if (path) {
      const { public_id, secure_url } = await uploadToCloudinary({
        localPath: path,
        folder: `EscapeRental/category/${data.name}/images`,
        resourceType: "image",
      });

      catData.image = { publicId: public_id, secureUrl: secure_url };
    }

    const category = await categoryRepo.updateById(id, catData);
    if (!category) {
      throw new ApiError(404, "category not found");
    }
    return category;
  },

  deleteCategory: async (id) => {
    if (!id) {
      throw new ApiError(404, "category id not found");
    }

    const category = await categoryRepo.deleteCategory(id);
    if (!category) {
      throw new ApiError(404, "category not found");
    }
    return category;
  },
};
