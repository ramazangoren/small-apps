const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Customer = require("./models/Customers");
const Restaurant = require("./models/Restaurant");
const Product = require("./models/Product");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const imageDownloader = require("image-downloader");
const fs = require("fs");
const path = require("path");
const { log } = require("console");
const uploadMiddleware = multer({ dest: "uploads/" });

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "asdfghjkl";
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
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

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, lastname, email, password } = req.body;
  try {
    const userDoc = await Customer.create({
      name,
      lastname,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await Customer.findOne({ email });
  // res.json(userDoc);
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("password not ok");
    }
  } else {
    res.status(422).json(" not found");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      console.log(userData);
      const { name, email, _id } = await Customer.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

// app.get("/account/:id", async (req, res) => {
//   const { token } = req.cookies;
//   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//     const { id } = req.params;
//     // console.log(userData);
//     const customerDoc = await Customer.findById(userData.id);
//     res.json([customerDoc]); 
//   });
// });

app.post("/add-restaurant", async (req, res) => {
  const { token } = req.cookies;
  const {
    name,
    location,
    phoneNumber,
    extraInfo,
    aboutUs,
    mondayOpens,
    mondayCloses,
    tuesdayOpens,
    tuesdayCloses,
    wednesdayOpens,
    wednesdayCloses,
    thursdayOpens,
    thursdayCloses,
    fridayOpens,
    fridayCloses,
    saturdayOpens,
    saturdayCloses,
    sundayOpens,
    sundayCloses,
    paymentDetails,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    try {
      const userDoc = await Restaurant.create({
        owner: userData.id,
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        extraInfo,
        aboutUs,
        mondayOpens,
        mondayCloses,
        tuesdayOpens,
        tuesdayCloses,
        wednesdayOpens,
        wednesdayCloses,
        thursdayOpens,
        thursdayCloses,
        fridayOpens,
        fridayCloses,
        saturdayOpens,
        saturdayCloses,
        sundayOpens,
        sundayCloses,
        paymentDetails,
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  });
});

app.get("/home", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Restaurant.find({ owner: id }));
  });
});

app.get("/home/info/:id", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = req.params;
    // console.log(userData);
    const restaurant = await Restaurant.findById(id);
    res.json([restaurant]); // Wrap the restaurant in an array
  });
});

app.post("/add-product/:id", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  const {
    categoryName,
    productName,
    productPrice,
    productExplanation,
    productPreparationTime,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    try {
      const userDoc = await Product.create({
        restaurant: id,
        categoryName,
        productName,
        productPrice,
        productExplanation,
        productPreparationTime,
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  });
});

// app.get("/home/menu/:id", async (req, res) => {
//   const { token } = req.cookies;
//   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//     const { id } = req.params;
//     // console.log(userData);
//     const restaurant = await Product.find({ restaurant: id });
//     res.json(restaurant); // Wrap the restaurant in an array
//   });
// });

app.get("/home/menu/:id", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = req.params;
    // console.log(userData);
    const restaurant = await Product.find({ restaurant: id });
    res.json([restaurant]);
  });
});

app.get("/menu/:id", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = req.params;
    // console.log(userData);
    const restaurant = await Product.findById(id);
    res.json([restaurant]);
  });
});

// this is for search input in header
app.get('/restaurants', async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const restaurants = await Restaurant.find({
      name: { $regex: new RegExp(searchTerm, 'i') },
    });

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => {
  console.log("server connected");
});
