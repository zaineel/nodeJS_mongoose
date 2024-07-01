const Product = require("../Models/Product.model");
const createError = require("http-errors");
const mongoose = require("mongoose");

module.exports = {
  getAllProducts: async (req, res, next) => {
    //next(new Error("cannot populate the list"));
    try {
      const result = await Product.find({}, { __v: 0 });
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  findProductById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      //const product = await Product.findOne({ _id: id });
      if (!product) {
        throw createError(404, "Item not found!");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product ID"));
      }
      next(error);
    }
  },

  createNewProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
    //   const product = new Product({
    //     name: req.body.name,
    //     price: req.body.price,
    //   product
    //     .save()
    //     .then((result) => {
    //       console.log(result);
    //       res.send(result);
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
    // });
  },

  updateAProduct: async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };
    try {
      const result = await Product.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Product not found!");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },

  deleteAProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw createError(404, "Item not found!");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },
};
