import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log("DATABASE CONNECTED SUCCESSFULLY");
    console.log(`${connection.connection.host} ${connection.connection.name}`);
  } catch (error) {
    console.error("DATABSE CONNECTION FAILD DUE TO", error);
    process.exit(1);
  }
};

export { connectDB };
