import { IProduct, ProductModel } from "../model/Product.Model";
import CategoeryService from "./CategoeryService";


class ProductService {
  async createProduct(product: IProduct ) {
    const new_product = await ProductModel.create(product);
    // update category
    if (new_product.categoryName.length) {
      await CategoeryService.getORCreateCategory(product.categoryName);
      CategoeryService.addProduct(new_product._id, product.categoryName);
    }
  }

  async getAllProducts() {
    return await ProductModel.find({});
  }

  async getProductById(_id: string) {
    return await ProductModel.findById(_id);
  }

  async getProductByName(_name: string) {
    return await ProductModel.find({ name: _name });
  }

  async updateProduct(_id: string, product:  Partial<IProduct>) {
    let new_product =  await ProductModel.findByIdAndUpdate(_id, product , {
      new: true,
      runValidators: true,
    });
    if (new_product?.categoryName.length) {
      await CategoeryService.getORCreateCategory(new_product.categoryName);
      CategoeryService.addProduct(new_product._id, new_product.categoryName);
    }
    return new_product;
  }

  async deleteProduct(_id: string) {
    let product = await ProductModel.findByIdAndDelete(_id);
    // remove from the category
    if (product?.categoryName?.length) {
      await CategoeryService.removeProduct(product._id, product.categoryName);
    }
  }

  async getProductByCategory(_category: string) {
    return await ProductModel.find({ categoryName: _category });
  }
}

export default new ProductService();
