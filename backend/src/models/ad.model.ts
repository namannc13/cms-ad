import { Schema, model } from "mongoose";

const adSchema = new Schema(
  {
    title: String,
    key: { type: String, required: true },
    duration: { type: Number, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
  },
  { timestamps: true }
);

export const Ad = model("Ad", adSchema);
