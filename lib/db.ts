import mongoose from "mongoose";

// Add URL for MongoDB 
const MONGODB_URI ="...";

// After that, open "http://localhost:3000/api/seed"
// run the Project -> npm run dev

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

