const sendDevError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    stack: err.stack,
    message: err.message,
    error: err.errors,
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

export const globalErrorHandler = (err, req, res) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV == "production") {
    sendProdError(err, res);
  }
};
