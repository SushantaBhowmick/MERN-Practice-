const multer = require("multer");

const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "prod",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const deleteFromCloud = async(url)=>{
    const publicId = url.split("/").slice(-1)[0].split(".")[0];
    console.log(publicId)
    return cloudinary.uploader.destroy(`prod/${publicId}`)
}

const uploadMultipleCloud = multer({ storage }).array("images", 5);
const uploadSingleClound = multer({ storage }).single("image");

module.exports = {
  uploadMultipleCloud,
  uploadSingleClound,
  deleteFromCloud,
};
