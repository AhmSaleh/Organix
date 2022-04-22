import ProductService from "../services/ProductService";
import { Request, Response } from "express";

class ProductController {
  static POSTProduct = POSTProduct;
  static GETProducts = GETProducts;
  static GETProductById = GETProductById;
  static DELETEProductById = DELETEProductById;
  static UPDATEProductById = UPDATEProductById;
}

async function POSTProduct(req: Request, res: Response) {
  try {
    const product = await ProductService.createProduct(req.body);
    res.send(product).status(200);
  } catch (err: any) {
    if (err.name === "ValidationError") {
      res.status(400).send(err);
    } else {
      res.status(500).send(err);
    }
  }
}

async function GETProducts(req: Request, res: Response) {
  try {
    const products = await ProductService.getAllProducts();
    res.send(products).status(200);
  } catch (err) {
    console.log(ProductService);
    res.status(500).send(err);
  }
}

async function GETProductById(req: Request, res: Response) {
  try {
    const product = await ProductService.getProductById(req.params.id);
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

async function DELETEProductById(req: Request, res: Response) {
  try {
    const product = ProductService.deleteProduct(req.params.id);
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

async function UPDATEProductById(req: Request, res: Response) {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
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

export default ProductController;
