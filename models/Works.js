import { Schema, model, models } from "mongoose";

const WorksSchema = new Schema(
  {
    title: String,
    category: String,
    location: String,
    description: String,
    size: String,
    year: Number,
    media: [],
    active: Boolean,
  },
  { timestamps: true }
);

const Works = models.Works || model("Works", WorksSchema);
export default Works;
