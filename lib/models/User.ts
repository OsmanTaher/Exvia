import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "admin", "professor"],
      default: "student",
    },
    grade: { type: String },
    department: { type: String },
    academicDegree: { type: String },
    age: { type: Number },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
