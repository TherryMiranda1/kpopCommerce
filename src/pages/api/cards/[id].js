import dbConnect from "src/lib/mongoose";
import Card from "src/models/Card";
import { uploadImage } from "src/lib/cloudinary";

import nextConnect from "next-connect";

dbConnect();

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  try {
    console.log(req.query);
    const { id } = req.query;
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

apiRoute.put(async (req, res) => {
  const { id } = req.query;
  const body = req.body
console.log(req)
  const updatedCard = await Card.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedCard) return res.status(404).json({ message: "Card not found" });
  return res.status(200).json(updatedCard);
});

apiRoute.delete(async (req, res) => {
  try {
    const { id } = req.query;
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard)
      return res.status(404).json({ message: "Card not found" });
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// export default async (req, res) => {
//   const {
//     method,
//     body,
//     headers,
//     query: { id },
//   } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const card = await Card.findById(id);
//         if (!card) return res.status(404).json({ message: "Card not found" });
//         return res.status(200).json(card);
//       } catch (error) {
//         return res.status(500).json({ error: error.message });
//       }

//     case "PUT":
//       try {
//         const updatedCard = await Card.findByIdAndUpdate(id, body, {
//           new: true,
//         });
//         if (!updatedCard)
//           return res.status(404).json({ message: "Card not found" });
//         return res.status(200).json(updatedCard);
//       } catch (error) {
//         return res.status(400).json({ error: error.message });
//       }
//     case "DELETE":
//       try {
//         const deletedCard = await Card.findByIdAndDelete(id);
//         if (!deletedCard)
//           return res.status(404).json({ message: "Card not found" });
//         return res.status(204).json();
//       } catch (error) {
//         return res.status(400).json({ error: error.message });
//       }
//     default:
//       return res.status(400).json({ msg: "this method is not supported" });
//   }
// };

export default apiRoute;

