import Blogs from "@/models/Blogs";
import dbConnect from "@/services/dbConnect";

export default async function blogsHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newBlogs = await Blogs.create(body);
        return res.status(200).json(newBlogs);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let blogs = null;
        if (req.query.id) {
          blogs = await Blogs.findById(req.query.id);
        } else {
          blogs = await Blogs.find();
        }
        return res.status(200).json(blogs);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateBlogs = await Blogs.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateBlogs) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateBlogs);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedBlogs = await Blogs.findByIdAndDelete(req.query.id);
        if (!deletedBlogs) {
          return res.status(404).json({ msg: "Blogs not found" });
        }
        return res.status(200).json({ msg: "Blogs deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
