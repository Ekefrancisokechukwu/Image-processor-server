const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  console.log(req.file);

  res.status(200).send({ message: "Image uploaded", path: req.file.path });
};

const transformImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image file provided.");
    }

    const { filename, path: filePath } = req.file;
    const outputFilePath = `processed/${filename}-processed.jpg`;

    // Get transformation options from the request body
    const { width, height, crop, rotate, watermark, format, filter } =
      req.query;

    // TODO: Implement image transformation logic here using the imagePath and transformation parameters

    let image = sharp(filePath);

    // Resize image
    if (width && height) {
      image = image.resize(parseInt(width), parseInt(height));
    }

    // Rotate image
    if (rotate) {
      image = image.rotate(parseInt(rotate));
    }

    col;

    // Apply filters
    if (filter === "grayscale") {
      image = image.grayscale();
    } else if (filter === "sepia") {
      image = image.modulate({ saturation: 0.3, hue: 90 });
    }
    const processedImageBuffer = await image.toBuffer();

    res.type(`image/${format || "png"}`).send(processedImageBuffer);
  } catch (error) {
    console.error("Error transforming image:", error);
    res.status(500).send("An error occurred while transforming the image");
  }
};

module.exports = { uploadImage, transformImage };
