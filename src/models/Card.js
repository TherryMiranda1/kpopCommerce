import { Schema, model, models } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Definimos el esquema de la colección
const cardSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [80, "Title must be at less than 40 characters"],
    },
    descripcion: {
      type: String,
      // required: [true, "Description is required"],
      trim: true,
    },
    tipo: {
      type: String,
      // required: true,
      trim: true,
    },
    rating: {
      type: Number,
      // required: true,
      trim: true,
    },
    precio: {
      type: Number,
      // required: true,
      trim: true,
    },
    existencia: {
      type: String,
      // required: true,
      trim: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    images: [{ url: String, public_id: String }],
    altImage: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

cardSchema.plugin(mongoosePaginate);

// exportamos el modelo
export default models.Card || model("Card", cardSchema);
