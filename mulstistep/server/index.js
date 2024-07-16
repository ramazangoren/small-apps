const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

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

app.get("/test", (req, res) => {
  res.json("Test Works");
});

// Register Route
app.post("/register", async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    address,
    phone,
    food,
  } = req.body;
  try {
    const userInfo = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      address,
      phone,
      food,
    });
    res.json(userInfo);
  } catch (error) {
    res.status(422).json(error);
  }
});


app.post("/add-restaurant", async (req, res) => {
  const {
    name, logo,location,phoneNumber,
    mondayOpens,  mondayCloses,
    tuesdayOpens, tuesdayCloses,
    wednesdayOpens,  wednesdayCloses,
    thursdayOpens, thursdayCloses,
    fridayOpens, fridayCloses,
    saturdayOpens, saturdayCloses,
    sundayOpens, sundayCloses,
    country,city,county,district,fullAddress, direction,
  } = req.body;
  try {
    const userInfo = await Restaurant.create({
      name, logo,location,phoneNumber,
      mondayOpens,  mondayCloses,
      tuesdayOpens, tuesdayCloses,
      wednesdayOpens,  wednesdayCloses,
      thursdayOpens, thursdayCloses,
      fridayOpens, fridayCloses,
      saturdayOpens, saturdayCloses,
      sundayOpens, sundayCloses,
      country,city,county,district,fullAddress, direction,
    });
    res.json(userInfo);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.listen(4000);
