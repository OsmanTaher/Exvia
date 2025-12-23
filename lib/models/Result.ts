import mongoose, { Schema, models, model } from "mongoose";

const ResultSchema = new Schema(
  {
    studentCode: { type: String, required: true },
    studentName: { type: String, required: true },
    department: { type: String, required: true }, // لنعرف القسم بسهولة
    courseName: { type: String, required: true },
    quizName: { type: String, required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Result = models.Result || model("Result", ResultSchema);
export default Result;