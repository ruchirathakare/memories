import dbConnect from "../../../../utils/dbConnect";
import PostMessage from "../../../../models/PostMessage";
import mongoose from "mongoose";
dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case "PUT":
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

      const post = await PostMessage.findById(id);

      const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount + 1 },
        { new: true }
      );

      res.json(updatedPost);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
