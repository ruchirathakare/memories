import PostMessage from "../../../models/PostMessage";

import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
      break;
    case "POST":
      const { title, message, selectedFile, creator, tags } = req.body;

      const newPostMessage = new PostMessage({
        title,
        message,
        selectedFile,
        creator,
        tags
      });

      try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
