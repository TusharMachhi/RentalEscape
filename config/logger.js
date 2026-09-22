import winston from "winston";

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const isProduction = process.env.NODE_ENV === "production";

const developmentFormat = combine(
  colorize(),

  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),

  errors({
    stack: true,
  }),

  printf(
    ({
      timestamp,
      level,
      message,
      stack,
      method,
      url,
      statusCode,
      ip,
      ...meta
    }) => {
      const requestInfo = method && url ? ` | ${method} ${url}` : "";

      const statusInfo = statusCode ? ` | Status: ${statusCode}` : "";

      const ipInfo = ip ? ` | IP: ${ip}` : "";

      const metadata =
        Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : "";

      return `${timestamp} ${level}: ${
        stack || message
      }${requestInfo}${statusInfo}${ipInfo}${metadata}`;
    },
  ),
);

const productionFormat = combine(
  timestamp(),

  errors({
    stack: true,
  }),

  json(),
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",

  format: isProduction ? productionFormat : developmentFormat,

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: "logs/app.log",
    }),
  ],

  exitOnError: false,
});
