import dbConnect from "../../../utils/dbConnect";
import PostMessage from "../../../models/PostMessage";
import mongoose from "mongoose";
dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case "GET":
      try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
      break;
    case "PUT":
      const { title, message, creator, selectedFile, tags } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

      const updatedPost = {
        creator,
        title,
        message,
        tags,
        selectedFile,
        _id: id
      };

      await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

      res.json(updatedPost);
      break;
    case "DELETE":
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

      await PostMessage.findByIdAndRemove(id);

      res.json({ message: "Post deleted successfully." });

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
