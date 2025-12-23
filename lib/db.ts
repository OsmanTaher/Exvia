import mongoose from "mongoose";

const MONGODB_URI ="mongodb+srv://nursemohamedtaher_db_user:rT9A0acppfjFnP6A@cluster0.r1lbtbd.mongodb.net/?appName=Cluster0";

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB (Atlas)");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export default connectToDatabase;
