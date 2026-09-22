import User from "../models/user.model.js";
import { ApiError } from "../utils/ErorrClassAPi.js";

export const genAccessAndRefreshToken = async (userId, role) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const accessToken = user.generateAccessToken({ userId, role });
  const refreshToken = user.generateRefreshToken({ userId, role });

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};
