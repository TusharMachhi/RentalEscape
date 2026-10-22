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

export const loginUser = async (req, res) => {
  logger.info("login user controller started");
  const data = req.validated.body;

  const { accessToken, refreshToken, user } =
    await userServices.loginUser(data);
  logger.info("user login successfully");

  const options = {
    secure: true,
    httpOnly: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ResponseApi(200, "user login successfully", user));
};

export const logoutUser = async (req, res) => {
  console.log(req.user);
  await userServices.logoutUser(req.user.userId);
  logger.info("logout user successfully");

  const options = {
    secure: true,
    httpOnly: true,
  };
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
  res.status(200).json(new ResponseApi(200, "user logout successfully "));
};

export const refresAceeshToken = async (req, res) => {
  logger.info("refresh access token controller started");

  const refreshToken = req?.cookies.refreshToken;

  console.log("controller ", refreshToken);

  const data = await userServices.renewedAccessToken(refreshToken);

  const options = {
    secure: true,
    httpOnly: true,
  };

  res
    .status(200)
    .cookie("accessToken", data?.accessToken, options)
    .cookie("refreshToken", data?.refreshToken, options)
    .json(new ResponseApi(200, "generate new access token"));
};

export const getAllUser = async (req, res) => {
  const query = req.query;

  const users = await userServices.getAllUser(query);

  res
    .status(200)
    .json(new ResponseApi(200, "all user fetch successfully", users));
};

export const uploadProfileImage = async (req, res) => {
  const user = req?.user;
  await userServices.uploadUserProfile(
    {
      localPath: req.file.path,
      folder: `EscapeRental/user/${user?.userId}/images`,
      resourceType: "image",
    },
    user.userId,
  );

  return res
    .status(201)
    .json(new ResponseApi(201, "user profile uploaded successfully"));
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userServices.getUser(id);

  res
    .status(200)
    .json(new ResponseApi(200, "fetch user data successfully", user));
};

export const deleteUser = async (req, res) => {
  const user = await userServices.deletUser(req?.user?.userId);
  logger.info(user);
  res.status(200).json(new ResponseApi(200, "user deleted successfully"));
};
