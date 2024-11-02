import Works from "@/models/Works";
import dbConnect from "@/services/dbConnect";

export default async function worksHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newWorks = await Works.create(body);
        return res.status(200).json(newWorks);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        let works = null;
        if (req.query.id) {
          works = await Works.findById(req.query.id);
        } else {
          works = await Works.find();
        }
        return res.status(200).json(works);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateWorks = await Works.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateWorks) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateWorks);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedWorks = await Works.findByIdAndDelete(req.query.id);
        if (!deletedWorks) {
          return res.status(404).json({ msg: "Works not found" });
        }
        return res.status(200).json({ msg: "Works deleted successfully" });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(405).json({ msg: "Method Not Allowed" });
  }
}
