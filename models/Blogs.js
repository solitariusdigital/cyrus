import { Schema, model, models } from "mongoose";

const BlogsSchema = new Schema(
  {
    fa: {
      title: String,
      description: String,
    },
    en: {
      title: String,
      description: String,
    },
    active: Boolean,
  },
  { timestamps: true }
);

const Blogs = models.Blogs || model("Blogs", BlogsSchema);
export default Blogs;
