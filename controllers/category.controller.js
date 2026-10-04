import { categoryService } from "../services/category.service.js";

import { ResponseApi } from "../utils/ResponseApi.js";

export const createCategory = async (req, res) => {
  console.log("start controller category");
  const data = req?.validated?.body;
  const catImage = req?.file.path;

  await categoryService.createCategory(data, catImage);

  res.status(201).json(new ResponseApi(201, "category created successfully"));
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.getCategory(id);
  res
    .status(200)
    .json(new ResponseApi(200, "fetch category successfully", category));
};

export const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res
    .status(200)
    .json(new ResponseApi(200, "fetch all category successfully", categories));
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await categoryService.deleteCategory(id);

  res.status(200).json(new ResponseApi(200, "category deleted successfully"));
};

export const updateCategory = async (req, res) => {
  console.log("updae controller", req.body);
  const { body, params } = req.validated;
  console.log(body, params);
  const path = req.file?.path;

  await categoryService.updateCategory({ id: params.id, path, data: body });
  res.status(200).json(new ResponseApi(200, "category updated successfully"));
};
