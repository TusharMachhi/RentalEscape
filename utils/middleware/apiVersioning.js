import { ApiError } from "../ErorrClassAPi";
export const apiVersioning = (version) => (req, res, next) => {
  if (req.path.startWith(`/api/${version}`)) {
    next();
  } else {
    return new ApiError(400, "api version is not supported");
  }
};
