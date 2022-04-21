require("../db/index");
const ProductModel = require("../Model/Product.Model");
const productModel = new ProductModel();

async function POSTProduct(req, res) {
  try {
    const product = await productModel.createProduct(req.body);
    res.send(product).status(200);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send(err);
    } else {
      res.status(500).send(err);
    }
  }
}

async function GETProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.send(products).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function GETProductById(req, res) {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .send(
          `Coudln't find product with the provided Id --> ${req.params.id}`
        );
    }
    res.send(product).status(200);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function DELETEProductById(req, res) {
  try {
    const product = await productModel.deleteProduct(req.params.id);
    if (!product) {
      res
        .status(404)
        .send(
          `Coudln't find product with the provided Id --> ${req.params.id}`
        );
    }
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function UPDATEProductById(req, res) {
  try {
    const product = await productModel.updateProduct(req.params.id, req.body);
    if (!product) {
      return res
        .status(404)
        .send(
          `Coudln't find product with the provided Id --> ${req.params.id}`
        );
    }
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
}
module.exports = {
  POSTProduct,
  GETProducts,
  GETProductById,
  DELETEProductById,
  UPDATEProductById,
};
