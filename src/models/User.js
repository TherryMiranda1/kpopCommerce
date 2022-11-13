import { Schema, model, models } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Definimos el esquema de la colección
const userSchema = new Schema(
  {
    type: {
      type: String,
      // required: true,
      trim: true,
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [40, "Name must be at less than 40 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      maxLength: [40, "Email must be at less than 200 characters"],
    },
    password: {
      type: String,
      // required: true,
      trim: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    altImage: {
      type: String,
      trim: true,
    },
    video: {
      url: String,
      public_id: String,
    },
    date: {
      type: Date,
    },
    uid: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.plugin(mongoosePaginate);

// exportamos el modelo
export default models.User || model("User", userSchema);
