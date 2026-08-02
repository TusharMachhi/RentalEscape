class ApiError extends Error {
  constructor(statusCode, message = "something went wrong", stack, error) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.success = false;
    this.errors = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
