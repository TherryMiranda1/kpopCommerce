import dbConnect from "src/lib/mongoose";
import Card from "src/models/Card";

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


