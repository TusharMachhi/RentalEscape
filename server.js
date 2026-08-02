import "dotenv-flow/config";
import { app } from "./app.js";
import { connectDB } from "./database/db.js";

const PORT = process.env.PORT;
console.log("node env", process.env.NODE_ENV);
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`SERVER CONNECTED ON ${PORT}`);
  });
};
startServer();
