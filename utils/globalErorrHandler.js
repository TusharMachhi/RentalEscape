import { logger } from "../config/logger.js";

const sendDevError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    stack: err.stack,
    message: err.message,
    valErrors: err.errors,
    error: err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message, error: err.errors });
  } else {
    res.status(500).json({ status: "error", message: "something went wrong" });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  logger.info("global error handler started");

  logger.error("Request failed", {
    name: err.name,
    message: err.message,
    status: err.status,
    statusCode: err.statusCode,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV == "production") {
    sendProdError(err, res);
  }
};
