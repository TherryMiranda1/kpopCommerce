import dbConnect from "src/lib/mongoose";
import Card from "src/models/Card";
//import { uploadImage } from "src/lib/cloudinary";
//import path from "path";
//import fs from "fs-extra";

import nextConnect from "next-connect";
//import multer from "multer";
//import fileUpload from "express-fileupload";

dbConnect();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(process.cwd(), "public", "tmp", "uploads"));
//     },
//     filename: function (req, file, cb) {
//       cb(null, new Date().getTime() + "-" + file.originalname);
//     },
//   }),
// });

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

// const uploadMiddleware = upload.array("images");

// apiRoute.use(uploadMiddleware);

// apiRoute.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "./public/uploads",
//   })
// );

apiRoute.get(async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

apiRoute.post(async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      precio,
      rating,
      existencia,
      tipo,
      files,
    } = req.body;
    // let files = [];
    // if (req.files) {
    //   for (let indice = 0; indice < req.files.images.length; indice++) {
    //     const item = req.files.images[indice];
    //     const result = await uploadImage(item.tempFilePath);
    //     files.push({ url: result.secure_url, public_id: result.public_id });
    //     // await fs.remove(item.tempFilePath);
    //   }
    // }
    // fs.remove('upload')

    const newCard = new Card({
      titulo,
      descripcion,
      precio,
      tipo,
      existencia,
      rating,
      images: files,
    });
    const savedCard = await newCard.save();

    return res.status(201).json(savedCard);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };
