import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI)
        console.log("MongoDb connect successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // 1 means fail 0 mean success

    }
}