import CategoryModel from "../model/Categoery";
import { IProduct, ProductModel } from "../model/Product.Model";
import CategoeryService from "./CategoeryService";

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
    let skip = (parseInt(page) - 1) * 12;

    return await ProductModel.find({}, {}, { limit: 12, skip: skip });
  }

  async getProductById(_id: string) {
    return await ProductModel.findById(_id);
  }

  async getProductByName(_name: string) {
    return await ProductModel.find({ name: _name });
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

  // Haven't tested this method yet.
  async getProductByCategory_noRef(_category: string, page: any = undefined) {
    if (!page) return await ProductModel.find({});
    let skip = (parseInt(page) - 1) * 12;

    return await ProductModel.find(
      { categoryName: _category },
      {},
      { limit: 12, skip: skip }
    );
  }

  async getProductByCategory(categoryName: string, page: any = undefined) {
    if (!page) return await ProductModel.find({});
    let start = (parseInt(page) - 1) * 12 + 1;

    return await CategoryModel.findOne(
      { name: categoryName },
      { products: { $slice: [start, 12] } }
    ).populate("products");
  }
}

export default new ProductService();
