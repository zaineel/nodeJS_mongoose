const express = require("express");
const app = express();
const ProductRoute = require("./Routes/Product.route");
const mongoose = require("mongoose");
const createError = require("http-errors");
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongodb+srv://zain:<>@cluster0.ugeq3sq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// 61Pz9eIXf6NQ5nTq
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/products", ProductRoute);
app.all("/test", (req, res) => {
  res.send(req.body);
});

// middleware
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
  //   const err = new Error("Not Found");
  //   err.status = 404;
  //   next(err);
});

// error handler and middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Sever started!");
});
