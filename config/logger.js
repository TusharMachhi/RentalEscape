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
  printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  }),
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
