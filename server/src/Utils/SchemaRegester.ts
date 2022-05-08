import { JSONSchemaType } from "ajv";
import { RoleEnum } from "../model/UserModel";

//TODO extend the schema regester user

export interface IRegesterData {
  email: string;
  password: string;
  name: {
    first: string;
    last: string;
  };
  role: RoleEnum;
  phone: string;
  img: string;
  addresses: string[];
}
const regester_schema: JSONSchemaType<IRegesterData> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 20,
      format: "password",
    },
    name: {
      type: "object",
      properties: {
        first: {
          type: "string",
          minLength: 2,
          maxLength: 20,
        },
        last: {
          type: "string",
          minLength: 2,
          maxLength: 20,
        },
      },
      required: ["first", "last"],
      additionalProperties: false,
    },
    role: {
      type: "string",
      enum: Object.values(RoleEnum),
      default: RoleEnum.user,
    },
    phone: {
      type: "string",
    },
    img: {
      type: "string",
    },
    addresses: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["email", "password", "name", "phone", "img"],
  additionalProperties: false,
};

export default regester_schema;
