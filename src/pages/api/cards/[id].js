import dbConnect from "src/lib/mongoose";
import Card from "src/models/Card";
import { uploadImage } from "src/lib/cloudinary";
import path from "path";

import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs-extra";

dbConnect();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public", "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  }),
});

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

const uploadMiddleware = upload.array("image");

apiRoute.use(uploadMiddleware);

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
  console.log(req.files);
  const { title, description } = req.body;
  const { id } = req.query;
  let image;
  if (req.files) {
    const result = await uploadImage(req.files[0].path);
    console.log(result);
    await fs.remove(req.files[0].path);
    image = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }
  const body = { title, description, image };

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

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
