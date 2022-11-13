import dbConnect from "src/lib/mongoose";
import User from "src/models/User";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    headers,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "PUT":
      try {
        const updatedUser = await User.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!updatedUser)
          return res.status(404).json({ message: "User not found" });
        return res.status(200).json(updatedUser);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case "DELETE":
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser)
          return res.status(404).json({ message: "User not found" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
};
