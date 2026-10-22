import { ApiError } from "../ErorrClassAPi.js";

export const parseJsonFields = (fields) => {
  return (req, res, next) => {
    for (const field of fields) {
      const value = req.body?.[field];

      if (typeof value !== "string") {
        continue;
      }

      try {
        req.body[field] = JSON.parse(value);
      } catch {
        return next(new ApiError(400, `${field} must contain valid JSON`));
      }
    }

    next();
  };
};
