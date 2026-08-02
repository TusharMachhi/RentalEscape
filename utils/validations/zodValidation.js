import { ApiError } from "../ErorrClassAPi.js";

const validateZod = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.issues.reduce((acc, el) => {
        const key = el.path.slice(1).join(".");

        if (!acc[key]) {
          acc[key] = el.message;
        }

        return acc;
      }, {});

      return next(new ApiError(400, "validation error", errors));
    }
    req.validated = result.data;
    return next();
  };
};
export { validateZod };
