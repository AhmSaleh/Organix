import ProductService from "../services/ProductService";
import { json, Request, Response } from "express";
import ajv from "../Utils/validate";
import path from "path";
import { Status } from "../model/Product.Model";

class ProductController {
  static POSTProduct = POSTProduct;
  static GETProducts = GETProducts;
  static GETProductById = GETProductById;
  static DELETEProductById = DELETEProductById;
  static UPDATEProductById = UPDATEProductById;
  static GETProductByName = GETProductByName;
  static GETProductBySearch = GETProductBySearch;
  static GETProductList = getProductList;
  static GETProductByCategory = GETProductByCategory;
  static GETProductsCount = GETProductsCount;
  static GETProductsByCatCount = GETProductsByCatCount;
  static GETProductByMerchent = GetProductsByMerchent;
  static GETProductImage = GETProductImage;
  static UPDATEProductStatus = UPDATEProductStatus;
  static GETPendingProducts = GETPendingProducts;
  static GETProductsBySearchCount = GETProductsBySearchCount;
}

async function UPDATEProductStatus(req: Request, res: Response) {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product)
      return res
        .status(404)
        .send(`There are no products matching id: ${req.params.id}.`);
    product.status = req.body.status;
    await ProductService.updateProduct(req.params.id, product);
    const finalProduct = await ProductService.getProductById(req.params.id);
    res.status(202).send(finalProduct);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function GETPendingProducts(req: Request, res: Response) {
  try {
    const products = await ProductService.getPendingProducts();
    if (!products)
      return res.status(404).send(`There are no pending products.`);
    res.send(products).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function GETProductImage(req: Request, res: Response) {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product)
      return res.status(404).send(`There are no products added by you.`);

    const imgPath = "../../" + product?.imgURL;
    res.sendFile(path.join(__dirname, imgPath));
  } catch (err) {
    res.status(500).send(err);
  }
}

async function GetProductsByMerchent(req: Request, res: Response) {
  try {
    const products = await ProductService.getProductsByMerchent(
      req.get("merchentID")
    );
    if (!products) {
      return res.status(404).send(`There are no products added by you.`);
    }
    res.send(products).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function POSTProduct(req: Request, res: Response) {
  try {
    req.body.status = Status.pending;
    req.body.availability = req.body.availableInventory > 0;
    const validate = ajv.getSchema("product");
    const valid = validate!(req.body);
    if (!valid) return res.status(400).send();
    const product = await ProductService.createProduct(req.body);
    res.send(product).status(200);
    res.send(); // 2 res.send()???
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

async function GETProductsBySearchCount(req: Request, res: Response) {
  try {
    const productsCount = await ProductService.getProductBySearchCount(
      req.params.search
    );
    res.send({ productsCount }).status(200);
  } catch (err) {
    res.status(500).send();
  }
}

async function getProductList(req: Request, res: Response) {
  try {
    let arr: string[] = JSON.parse(req.params.list);
    const list = await ProductService.getProductList(arr);
    //validation....
    res.send(list).status(200);
  } catch (err) {
    res.status(404).send(err);
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
    req.body.status = "pending";
    req.body.availability = req.body.availableInventory > 0;
    const validate = ajv.getSchema("product");
    const valid = validate!(req.body);

    // console.log(validate);

    if (!valid) return res.status(400).send();

    const product = await ProductService.getProductById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .send(
          `Coudln't find product with the provided Id --> ${req.params.id}`
        );
    }
    if (req.body.merchantId != product?.merchantId)
      return res
        .status(403)
        .send(`You have no authorization to update this product.`);
    if (!req.body.imgURL) req.body.imgURL = product.imgURL;
    const updatedProduct = await ProductService.updateProduct(
      req.params.id,
      req.body
    );
    res.send(updatedProduct);
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

async function GETProductBySearch(req: Request, res: Response) {
  try {
    let { page } = req.query;
    if (!page) page = "1";
    const products = await ProductService.getProductBySearch(
      req.params.search,
      page
    );
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
