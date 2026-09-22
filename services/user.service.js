import jwt from "jsonwebtoken";
import { userRepo } from "../repositories/user.repo.js";
import { ApiError } from "../utils/ErorrClassAPi.js";
import { genAccessAndRefreshToken } from "../utils/genRefAndAcessToken.js";
import { logger } from "../config/logger.js";

export const userServices = {
  register: async (data) => {
    const existingUser = await userRepo.findByEmail(data.email);
    console.log(existingUser);

    if (existingUser) {
      throw new ApiError(409, "user already exist");
    }

    const user = await userRepo.create(data);

    return user;
  },

  loginUser: async (data) => {
    console.log(data);
    const user = await userRepo.findByEmail(data.email, "+password");

    if (!user) {
      throw new ApiError(404, "user not found");
    }
    const checkPassword = await user.isCorrectPassword(data.password);

    if (!checkPassword) {
      throw new ApiError(401, "invalid email or password");
    }
    console.log(user._id);
    const { accessToken, refreshToken } = await genAccessAndRefreshToken(
      user._id,
      user.role,
    );

    return { accessToken, refreshToken, user };
  },

  logoutUser: async (data) => {
    const user = await userRepo.findById(data);
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    const refreshTokenResponse = await userRepo.invalidateRefreshToken(data);

    return refreshTokenResponse;
  },

  renewedAccessToken: async (refreshToken) => {
    if (!refreshToken) {
      throw new ApiError(401, "refresh token expired");
    }
    console.log(refreshToken);
    const decoded = jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET);

    const user = await userRepo.findById(decoded?.userId, "+refreshToken");

    if (!user) {
      throw new ApiError(404, "invalide refresh token");
    }

    logger.debug(user);
    if (refreshToken !== user?.refreshToken) {
      throw new ApiError(401, "invalid refresh token or used");
    }

    const tokens = await genAccessAndRefreshToken(user?._id, user?.role);

    return tokens;
  },
  getAllUser: async (data) => {
    const users = await userRepo.find(data);
    return users;
  },

  getUser: async (data) => {
    const user = await userRepo.findById(data);
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    return user;
  },
};
