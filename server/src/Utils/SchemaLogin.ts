import { JSONSchemaType } from "ajv";

export interface ILoginData {
  email: string;
  password: string;
}

const regester_schema: JSONSchemaType<ILoginData> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
};

export default regester_schema;
