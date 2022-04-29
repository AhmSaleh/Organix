import mongoose from "mongoose";

export interface IProduct {
  name: string;
  rate: number;
  price: number;
  shortDescription: string;
  availability: boolean;
  imgURL: string[];
  weight: number;
  availableInventory: number;
  longDescription: string;
  productInformation: string;
}

var ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Product Name is required"],
  },
  rate: {
    type: Number,
    min: [0, "Rate can't be less than 1"],
    max: [5, "Rate can't be more than 5"],
  },
  price: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value <= 0) throw new Error("Price can't be less than or equal zero");
    },
  },
  shortDescription: {
    type: String,
    required: true,
  },
  availability: Boolean,
  imgURL: {
    type: [String],
  },
  weight: {
    type: Number,
    validate(value: number) {
      if (value <= 0)
        throw new Error("Weight can't be less than or equal zero");
    },
  },
  availableInventory: {
    type: Number,
    required: true,
    min:[0,"Available Inventory can't be less than zero"],
  },
  longDescription: {
    type: String,
  },
  productInformation: {
    type: String,
  },
});

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
export { ProductModel, ProductSchema };
