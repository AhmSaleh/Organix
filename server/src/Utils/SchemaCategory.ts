import { JSONSchemaType } from "ajv";
import { ICategory } from "../model/Categoery";

const category_schema: JSONSchemaType<ICategory & { products?: string[] }> = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    imageUrl: {
      type: "string",
      nullable: true,
    },
    products: {
      type: "array",
      nullable: true,
      items: {
        type: "string",
      },
    },
  },
  required: ["name"],
  additionalProperties: false,
};

export default category_schema;
