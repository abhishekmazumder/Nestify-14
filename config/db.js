import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  // if the database is already connected, then don't connect again
  if (connected) {
    console.log("MongoDB is connected successfully!");
    return;
  }
  // connect to mongo db
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;