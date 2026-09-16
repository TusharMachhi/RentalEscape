import { userServices } from "../services/user.service.js";
import { ResponseApi } from "../utils/ResponseApi.js";
import { logger } from "../config/logger.js";

export const register = async (req, res) => {
  logger.info("start user register controller");
  const data = req.validated.body;

  const user = await userServices.register(data);

  logger.info("user created successfully", {
    userId: user._id,
    email: user.email,
  });

  return res
    .status(201)
    .json(new ResponseApi(201, "user created successfuly", user));
};

export const loginUser = (req, res) => {
  const data = req.validated.body;
};

export const uploadProfileImage = async (req, res) => {
  console.log(req.file);
  console.log("profile image upload");
  return res
    .status(201)
    .json(new ResponseApi(201, "user profile uploaded successfully"));
};
