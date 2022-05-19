import { JSONSchemaType } from "ajv";
import { IProduct } from "../model/Product.Model";

const procut_schema: JSONSchemaType<IProduct & { merchantId: string }> = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    rate: {
      type: "number",
      minimum: 0,
      maximum: 5,
    },
    price: {
      type: "number",
      exclusiveMinimum: 0,
    },
    shortDescription: {
      type: "string",
      minLength: 0,
      maxLength: 70,
    },
    availability: {
      type: "boolean",
    },
    weight: {
      type: "number",
      exclusiveMinimum: 0,
    },
    availableInventory: {
      type: "number",
      minimum: 0,
    },
    longDescription: {
      type: "string",
      minLength: 0,
    },
    productInformation: {
      type: "string",
    },
    categoryName: {
      type: "string",
    },
    imagesURL: {
      type: "array",
      items: {
        type: "string",
        format: "uri",
      },
    },
    imgURL: {
      type: "string",
    },
    merchantId: {
      type: "string",
      pattern: "^[0-9a-fA-F]{24}$",
    },
    status: {
      type: "string",
    },
  },
  required: [
    "name",
    "price",
    "shortDescription",
    "availableInventory",
    "weight",
    "longDescription",
    "productInformation",
    "categoryName",
    "imgURL",
    "merchantId",
    "status",
    "availability",
  ],
};

export default procut_schema;
