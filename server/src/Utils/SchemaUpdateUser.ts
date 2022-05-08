import { JSONSchemaType } from "ajv";

export interface IRegesterDataForUser {
  email?: string;
  password?: string;
  name?: {
    first?: string;
    last?: string;
  };
  phone?: string;
  img?: string;
  addresses?: string[];
}
const regester_schema_user: JSONSchemaType<IRegesterDataForUser> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      nullable: true,
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 20,
      format: "password",
      nullable: true,
    },
    name: {
      type: "object",
      nullable: true,
      properties: {
        first: {
          type: "string",
          minLength: 2,
          maxLength: 20,
          nullable: true,
        },
        last: {
          type: "string",
          minLength: 2,
          maxLength: 20,
          nullable: true,
        },
      },
      additionalProperties: false,
    },
    phone: {
      type: "string",
      nullable: true,
    },
    img: {
      type: "string",
      nullable: true,
    },
    addresses: {
      type: "array",
      items: { type: "string" },
      nullable: true,
    },
  },
  additionalProperties: false,
};

export default regester_schema_user;
