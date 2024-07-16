const express = require("express");
const cors = require("cors");
const app = express();
const Video = require("./models/Video");
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use('/api/videos', videoRoutes)

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

app.post("/api", async (req, res) => {
  const { imgUrl, videoUrl } = req.body;

  if (!imgUrl || !videoUrl) {
    res.status(400);
    throw new Error("this area can't be empty");
  }

  try {
    const video = await Video.create({ imgUrl, videoUrl });
    res.status(201).json({ sucess: true, video });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw error;
  }
});

app.get("/api", async (req, res) => {
  try {
    const data = await Video.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(4000);
