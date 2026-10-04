import { baseRepo } from "./base.repo.js";
import CategoryModel from "../models/category.model.js";

export const categoryRepo = {
  ...baseRepo(CategoryModel),

  findCategory: (name) => CategoryModel.findOne({ name }),

  deleteCategory: (id) =>
    CategoryModel.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { returnDocument: "after" },
    ),
};
