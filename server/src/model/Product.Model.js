var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
  name: {
    type: [String, "Product Name must be of type 'string'"],
    required: [true, "Product Name is required"],
  },
  rate: {
    type: [Number, "Rate must be of type 'Number'"],
    default: 0,
    min: [0, "Rate can't be less than 0"],
    max: [0, "Rate can't be more than 5"],
  },
  price: {
    type: [Number, "Rate must be of type 'Number'"],
    required: true,
    validate(value) {
      if (value <= 0) throw new Error("Price can't be less than or equal zero");
    },
  },
  shortDescription: {
    type: [String, "The Short Description must be of type 'String'"],
    required: true,
  },
  availability: {
    type: [Boolean, "Availability must be of type 'Boolean'"],
  },
  imgsURL: {
    type: [String, "Product Name must be of type 'string'"],
    required: true,
  },
  Weight: {
    type: [Number, "Weight must be of type 'Number'"],
    required: true,
    validate(value) {
      if (value <= 0)
        throw new Error("Weight can't be less than or equal zero");
    },
  },
  availableInventory: {
    type: [Number, "The Available Inventory must be of type 'Number'"],
    required: true,
    validate(value) {
      if (value <= 0)
        throw new Error(
          "The Available Inventory can't be less than or equal zero"
        );
    },
  },
  longDescription: {
    type: [String, "The Long Description must be of type 'String'"],
    required: true,
  },
  productInformation: {
    type: [String, "The Product Information must be of type 'String'"],
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
