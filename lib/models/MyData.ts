import { Schema, models, model } from "mongoose";

const MyDataSchema = new Schema({
  name: { type: String, required: true }, 
  email: { type: String }, 
  message: { type: String },
}, { timestamps: true });

const MyData = models.MyData || model("MyData", MyDataSchema);

export default MyData;