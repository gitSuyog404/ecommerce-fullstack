import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB at ${conn.connection.host}`);
  } catch (err) {
    console.log("Failed to connected to db:", err.message);
    process.exit(1);
  }
};

export default connectDB;
