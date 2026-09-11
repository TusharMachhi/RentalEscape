import cors from "cors";

export const configureCors = () => {
  const allowOrigins = process.env.ORIGINS
    ? process.env.ORIGINS.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : [];

  return cors({
    origin: (origin, callback) => {
      if (!origin || allowOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("not allow by cors"));
      }
    },
    methods: ["POST", "PATCH", "GET", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "Accept-Version",
    ],
    exposedHeaders: [],

    optionsSuccessStatus: 204,
    maxAge: 600,
  });
};
