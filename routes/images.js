const express = require("express");
const { transformImage, uploadImage } = require("../controller/images");

const router = express.Router();
router.route("/").post(uploadImage);

router.route("/transform").post(transformImage);

module.exports = router;
