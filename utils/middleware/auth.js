import { asyncHandler } from "../asyncHandler.js";
import { ApiError } from "../ErorrClassAPi.js";
import jwt from "jsonwebtoken";
export const auth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new ApiError(401, "invalid token");
  }
  const decodeded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);
  if (!decodeded) {
    throw new ApiError(401, "invalid jwt token");
  }
  req.user = decodeded;
  next();
});
