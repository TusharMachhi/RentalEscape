import { asyncHandler } from "../asyncHandler";
import { ApiError } from "../ErorrClassAPi.js";

export const roleAuth = asyncHandler((...role) => {
  return async (req, res, next) => {
    if (!role.includes(req.user.role)) {
      throw new ApiError(403, "you are not allow to access");
    }
    next();
  };
});
