const express = require("express");
const app = express();

const multer = require("multer");
const middlewareErrorHandler = require("./middleware/error-handler");

// Routers
const imageRouter = require("./routes/images");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const mimetype = file.mimetype;
    if (mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// middleware
app.use(upload.single("file"));

app.use(express.json());
app.use("/api/v1/images", imageRouter);

app.get("/", (req, res) => {
  res.status(200).send("Image processing server");
});

app.use(middlewareErrorHandler);
app.use((req, res) => res.status(404).send("Route does not exists!."));

const PORT = 5000;

const start = () => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
};

start();
