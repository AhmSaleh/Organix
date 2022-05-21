import { JSONSchemaType } from "ajv";
import { RoleEnum } from "../model/UserModel";

export interface IRegesterDataForUserByAdmin {
  name?: {
    first?: string;
    last?: string;
  };
  phone?: string;
  img?: string;
  addresses?: string[];
  role?: RoleEnum;
}

const regester_schema_userByAdmin: JSONSchemaType<IRegesterDataForUserByAdmin> = {
  type: "object",
  properties: {
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
    role: {
      type: "string",
      enum: Object.values(RoleEnum),
      nullable: true,
    }
  },
  additionalProperties: false,
};

export default regester_schema_userByAdmin;
