import CategoryModel from "../model/Categoery";
import { IProduct, ProductModel } from "../model/Product.Model";
import CategoeryService from "./CategoeryService";
import envconf from "../envconf";

class ProductService {
  async createProduct(product: IProduct) {
    const new_product = await ProductModel.create(product);
    // update category
    if (new_product.categoryName.length) {
      await CategoeryService.getORCreateCategory(product.categoryName);
      await CategoeryService.addProduct(new_product._id, product.categoryName);
    }
  }

  async getAllProducts(page: any = undefined) {
    if (!page) return await ProductModel.find({});
    let skip = (parseInt(page) - 1) * +envconf.ProductsLimit;

    return await ProductModel.find(
      {},
      {},
      { limit: +envconf.ProductsLimit, skip: skip }
    );
  }

  async getProductById(_id: string) {
    return await ProductModel.findById(_id);
  }

  async getProductByName(_name: string, page: any = undefined) {
    if (!page) return await ProductModel.find({});
    let skip = (parseInt(page) - 1) * +envconf.ProductsLimit;

    return await ProductModel.find(
      { name: _name },
      {},
      { limit: +envconf.ProductsLimit, skip: skip }
    );
  }

  async getProductBySearch(search: string, page: any = undefined) {
    if (!page) page = 1;
    let skip = (parseInt(page) - 1) * +envconf.ProductsLimit;
    let regex = new RegExp(search, "i");
    const products =  await ProductModel.find(
      { $text: {
        $search: search,
      } },
      { score: { $meta: "textScore" } },
      { limit: +envconf.ProductsLimit, skip: skip }
    ).sort( { score: { $meta: "textScore" } } );

    return products
  }


  async updateProduct(_id: string, product: Partial<IProduct>) {
    let old_product = await ProductModel.findByIdAndUpdate(_id, product, {
      runValidators: true,
    });
    if (product?.categoryName?.length && old_product) {
      await CategoeryService.getORCreateCategory(product.categoryName);
      await CategoeryService.addProduct(old_product._id, product.categoryName);
    }
    if (!product?.categoryName?.length && old_product) {
      await CategoeryService.removeProduct(
        old_product._id,
        old_product.categoryName
      );
    }
    return old_product;
  }

  async deleteProduct(_id: string) {
    let product = await ProductModel.findByIdAndDelete(_id);
    // remove from the category
    if (product?.categoryName?.length) {
      await CategoeryService.removeProduct(product._id, product.categoryName);
    }
  }

  async getProductByCategory_noRef(_category: string, page: any = undefined) {
    if (!page) return await ProductModel.find({});
    let skip = (parseInt(page) - 1) * +envconf.ProductsLimit;

    return await ProductModel.find(
      { categoryName: _category },
      {},
      { limit: +envconf.ProductsLimit, skip: skip }
    );
  }

  async getProductByCategory(categoryName: string, page: any = undefined) {
    if (!page) return await ProductModel.find({});
    let start = (parseInt(page) - 1) * +envconf.ProductsLimit + 1;

    return await CategoryModel.findOne(
      { name: categoryName },
      { products: { $slice: [start, +envconf.ProductsLimit] } }
    ).populate("products");
  }

  async getAllProductsCount() {
    const count =
      (await ProductModel.countDocuments()) / +envconf.ProductsLimit;
    return Math.ceil(count);
  }

  async getProductByCategoryCount(categoryName: any) {
    const count =
      (await ProductModel.find({
        categoryName,
      }).countDocuments()) / +envconf.ProductsLimit;

    return Math.ceil(count);
  }
}

export default new ProductService();
