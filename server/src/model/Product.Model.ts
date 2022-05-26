import mongoose from "mongoose";

export interface IProduct {
  name: string;
  rate: number;
  price: number;
  shortDescription: string;
  availability: boolean;
  imagesURL: string[];
  imgURL: string;
  weight: number;
  availableInventory: number;
  longDescription: string;
  productInformation: string;
  categoryName: string;
  merchantId: mongoose.Types.ObjectId;
  status: Status;
  dateAdded: number;
}

export enum Status {
  approved = "approved",
  pending = "pending",
  rejected = "rejected",
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
    type: String,
  },
  imagesURL: {
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
    min: [0, "Available Inventory can't be less than zero"],
  },
  longDescription: {
    type: String,
  },
  productInformation: {
    type: String,
  },
  categoryName: {
    type: String,
    required: true,
  },
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
  },
  status: {
    type: String,
    enum: Object.values(Status),
  },
  dateAdded: {
    type: Number,
  },
});

ProductSchema.index(
  {
    name: "text",
    shortDescription: "text",
    longDescription: "text",
    productInformation: "text",
    categoryName: "text",
  },
  {
    weights: {
      name: 5,
      shortDescription: 2,
      longDescription: 1,
      productInformation: 1,
      categoryName: 1,
    },
  }
);

// ProductSchema.virtual('abailability').get(()=> this.availableInventory != 0);
const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
export { ProductModel, ProductSchema };
