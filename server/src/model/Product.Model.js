var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is required"],
  },
  rate: {
    type: Number,
    default: 0,
    min: [0, "Rate can't be less than 0"],
    max: [0, "Rate can't be more than 5"],
  },
  price: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0) throw new Error("Price can't be less than or equal zero");
    },
  },
  shortDescription: {
    type: String,
    required: true,
  },
  availability: Boolean,
  imgURL: {
    type: String,
    required: true,
  },
  Weight: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0)
        throw new Error("Weight can't be less than or equal zero");
    },
  },
  availableInventory: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0)
        throw new Error(
          "The Available Inventory can't be less than or equal zero"
        );
    },
  },
  longDescription: {
    type: String,
    required: true,
  },
  productInformation: {
    type: String,
    required: true,
  },
});

ProductSchema.methods.createProduct = async function (product) {
  return await mongoose.model("Product").create(product);
};

ProductSchema.methods.getAllProducts = async function () {
  return await mongoose.model("Product").find({});
};

ProductSchema.methods.getProductById = async function (_id) {
  return await mongoose.model("Product").findById(_id);
};

ProductSchema.methods.updateProduct = async function (_id, product) {
  return await mongoose
    .model("Product")
    .findByIdAndUpdate(_id, product, { new: true, runValidators: true });
};

ProductSchema.methods.deleteProduct = async function (_id) {
  return await mongoose.model("Product").findByIdAndDelete(_id);
};

module.exports = mongoose.model("Product", ProductSchema);
