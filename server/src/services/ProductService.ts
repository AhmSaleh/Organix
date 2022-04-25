import mongoose from "mongoose";
import { IProduct, ProductModel } from "../model/Product.Model";

class ProductService {
  async createProduct(product: IProduct) {
    return await ProductModel.create(product);
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

  async updateProduct(_id: string, product: IProduct) {
    return await ProductModel.findByIdAndUpdate(_id, product, {
      new: true,
      runValidators: true,
    });
  }

  async deleteProduct(_id: string) {
    return await ProductModel.findByIdAndDelete(_id);
  }
}

export default new ProductService();
