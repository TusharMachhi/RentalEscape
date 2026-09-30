import { userRepo } from "../../repositories/user.repo.js";
import { asyncHandler } from "../asyncHandler.js";
import { ApiError } from "../ErorrClassAPi.js";
import jwt from "jsonwebtoken";
export const auth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new ApiError(401, "invalid token");
  }
  const decoded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);
  if (!decoded) {
    throw new ApiError(401, "invalid jwt token");
  }

  const user = await userRepo.findById(decoded?.userId);

  if (!user) {
    throw new ApiError(404, "user not found");
  }
  if (user.isPasswordChanged(decoded?.iat)) {
    throw new ApiError(401, "user recetly changed password");
  }

  req.user = decoded;
  next();
});
