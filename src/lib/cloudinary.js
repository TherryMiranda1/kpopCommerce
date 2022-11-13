import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(
    filePath,
    {
      resource_type: "image",
      folder: "DanielRemax",
    },
    function (error, result) {
      console.log(result, error);
    }
  );
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const uploadVideo = async (filePath) => {
  return await cloudinary.uploader.upload(
    filePath,
    {
      resource_type: "video",
      folder: "DanielRemax",
    },
    function (error, result) {
      console.log(result, error);
    }
  );
};

export const deleteVideo = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
