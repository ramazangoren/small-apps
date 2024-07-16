const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Photo = require("./models/Photo.js");
const multer = require("multer");
require("dotenv").config();
// const imageDownloader = require("image-downloader");
const fs = require("fs");
const path = require("path");
// const uploadMiddleware = multer({ dest: "uploads/" });

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3003" }));
// app.use(cors());
app.use(express.json());
app.use("uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    if (error.codeName === "AtlasError") {
      console.error(
        "Atlas-specific error details:",
        error[Symbol.for("errorLabels")]
      );
    }
  });

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
  // console.log(req.file);
  Photo.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get("/uploads", (req, res) => {
  Photo.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.listen(3005, () => {
  console.log("server connected");
});
