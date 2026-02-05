import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Connection successful");
  } catch (error) {
    console.error("Connection failed | ", error);
    process.exit(1);
  }
};

export default ConnectDB;
