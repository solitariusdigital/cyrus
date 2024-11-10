import { Schema, model, models } from "mongoose";

const WorksSchema = new Schema(
  {
    fa: {
      title: String,
      category: String,
      subCategory: String,
      location: String,
      description: String,
      size: String,
      material: String,
      year: Number,
    },
    en: {
      title: String,
      category: String,
      subCategory: String,
      location: String,
      description: String,
      size: String,
      material: String,
      year: Number,
    },
    media: [],
    active: Boolean,
  },
  { timestamps: true }
);

const Works = models.Works || model("Works", WorksSchema);
export default Works;
