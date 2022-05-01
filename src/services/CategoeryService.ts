import { Schema, Types } from "mongoose";
import CategoryModel, { ICategory } from "../model/Categoery";
import { IProduct } from "../model/Product.Model";
import ProductService from "./ProductService";



class CategoerySerice {
    async createCategory(category: ICategory) {
        return await CategoryModel.create(category);
    }

    async getAllCategories() {
        return await CategoryModel.find({});
    }

    async getCategoryById(_id: string) {
        return await CategoryModel.findById(_id);
    }

    async getCategoryByName(_name: string) {
        return await CategoryModel.findOne({ name: _name });
    }

    async getORCreateCategory(categoryName: string) {
        let category = await this.getCategoryByName(categoryName);
        if (!category) {
            category = await this.createCategory({ name: categoryName });
        }
        return category;
    }

    async updateCategory(_id: string, category: ICategory) {
        return await CategoryModel.findByIdAndUpdate(_id, category, {
            new: true,
            runValidators: true,
        });
    }

    async deleteCategory(_id: string) {
        const category = await CategoryModel.findByIdAndDelete(_id);
        // remove category from all products
        if(category?.products?.length) {
            category.products.forEach(product => {
                ProductService.updateProduct(product as unknown as string, { categoryName: "" } as Partial<IProduct>);
            });
        }
        return category;
    }


    async addProduct(productId: Types.ObjectId, categoryName: string) {
        CategoryModel.updateOne({ name: categoryName }, { $push: { products: productId } })
    }
    async removeProduct(productId: Types.ObjectId, categoryName: string) {
        CategoryModel.updateOne({ name: categoryName }, { $pull: { products: productId } })
    }
}

export default new CategoerySerice();