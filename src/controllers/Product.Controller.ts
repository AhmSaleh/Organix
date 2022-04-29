import ProductService from "../services/ProductService";
import { Request, Response } from "express";
import ajv from "../Utils/validate";


class ProductController {
  static POSTProduct = POSTProduct;
  static GETProducts = GETProducts;
  static GETProductById = GETProductById;
  static DELETEProductById = DELETEProductById;
  static UPDATEProductById = UPDATEProductById;
  static GETProductByName = GETProductByName;
}

async function POSTProduct(req: Request, res: Response) {
  try {
    const validate = ajv.getSchema("product");
    const valid = validate!(req.body);

    if (!valid) return res.status(400).send();

    const product = await ProductService.createProduct(req.body);
    res.send(product).status(200);
    res.send();
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

async function GETProductByName(req: Request, res: Response) {
  try {
    const product = await ProductService.getProductByName(req.params.name);
    if (!product) {
      return res
        .status(404)
        .send(
          `Coudln't find product with the provided Name --> ${req.params.id}`
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
    const validate = ajv.getSchema("product");
    const valid = validate!(req.body);

    if (!valid) return res.status(400).send();

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
