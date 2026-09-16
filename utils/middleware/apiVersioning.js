import { ApiError } from "../ErorrClassAPi.js";
export const apiVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    return next(new ApiError(400, "api version is not supported"));
  }
};
