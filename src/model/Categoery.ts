import mongoose from "mongoose";
import types from "mongoose"
export interface ICategory {
  name: string;
  imageUrl?: string;
  products?: types.ObjectId[];
}

let CategorySchema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: [true, "Category Name is required"],
        unique: true,
        index: "text",
        _id: true
        
    },
    imageUrl: {
        type: String,
    },
    products: {
        type: [types.Types.ObjectId],
        ref: "Product",
        default: []
    }
});


const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
export default CategoryModel;