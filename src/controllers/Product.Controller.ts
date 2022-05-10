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
  static GETProductBySearch = GETProductBySearch;
  static GETProductByCategory = GETProductByCategory;
  static GETProductsCount = GETProductsCount;
  static GETProductsByCatCount = GETProductsByCatCount;
  static GETProductsBySearchCount = GETProductsBySearchCount;
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
    let { page } = req.query;
    if (!page) page = "1";

    const products = await ProductService.getAllProducts(page);
    res.send(products).status(200);
  } catch (err) {
    res.status(500).send();
  }
}

async function GETProductsCount(req: Request, res: Response) {
  try {
    const productsCount = await ProductService.getAllProductsCount();
    res.send({ productsCount }).status(200);
  } catch (err) {
    res.status(500).send();
  }
}
async function GETProductsByCatCount(req: Request, res: Response) {
  try {
    const productsCount = await ProductService.getProductByCategoryCount(
      req.query.category
    );
    res.send({ productsCount }).status(200);
  } catch (err) {
    res.status(500).send();
  }
}

async function GETProductsBySearchCount(req:Request, res:Response){
  try {
    const productsCount = await ProductService.getProductBySearchCount(
      req.params.search
    );
    res.send({ productsCount }).status(200);
  } catch (err) {
    res.status(500).send();
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
    let { page } = req.query;
    if (!page) page = "1";

    const product = await ProductService.getProductByName(
      req.params.name,
      page
    );
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

async function GETProductByCategory(req: Request, res: Response) {
  try {
    let { page } = req.query;
    if (!page) page = "1";

    const products = await ProductService.getProductByCategory(
      req.params.category,
      page
    );
    if (!products) {
      return res
        .status(404)
        .send(
          `Coudln't find product with the provided Category --> ${req.params.category}`
        );
    }
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function GETProductBySearch(req:Request, res:Response){
  try {
    let { page } = req.query;
    if (!page) page = "1";
    const products = await ProductService.getProductBySearch(req.params.search, page);
    if (!products) {
      return res
        .status(404)
        .send(
          `Coudln't find product with the provided Search --> ${req.params.search}`
        );
        }
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
}
export default ProductController;
